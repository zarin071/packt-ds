#!/usr/bin/env node
/**
 * Removes exact-duplicate token groups left behind by Figma renames.
 *
 * When a group is renamed in Figma (e.g. Background → bg), Tokens Studio
 * writes the new name into token.json without deleting the old one. This
 * script finds groups within the same token set that have identical leaf
 * values and keeps only the preferred name, discarding the stale copies.
 *
 * Preference order (first wins):
 *   1. All-lowercase name
 *   2. Shorter name
 *   3. Alphabetically earlier
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN_FILE = path.resolve(__dirname, '../tokens/token.json');

function leafValues(obj, prefix = '') {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}/${k}` : k;
    if (v && typeof v === 'object' && '$value' in v) {
      out[key] = String(v.$value);
    } else if (v && typeof v === 'object') {
      Object.assign(out, leafValues(v, key));
    }
  }
  return out;
}

function identical(a, b) {
  const va = leafValues(a);
  const vb = leafValues(b);
  const ka = Object.keys(va).sort();
  const kb = Object.keys(vb).sort();
  // Never treat two empty groups as duplicates — they may be valid placeholders
  if (ka.length === 0 && kb.length === 0) return false;
  if (ka.join('\0') !== kb.join('\0')) return false;
  return ka.every(k => va[k] === vb[k]);
}

// Lowercase > shorter > alphabetically earlier
function preferred(names) {
  return [...names].sort((a, b) => {
    const aLow = a === a.toLowerCase();
    const bLow = b === b.toLowerCase();
    if (aLow !== bLow) return aLow ? -1 : 1;
    if (a.length !== b.length) return a.length - b.length;
    return a.localeCompare(b);
  })[0];
}

const data = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
let totalRemoved = 0;

const SKIP = new Set(['$themes', '$metadata']);

// Walk every object in the token tree and remove stale leaf-level tokens:
//
//   1. Rename artifacts — `name` kept alongside `name-default` with the same value
//      (Figma rename: old name never deleted)
//
//   2. Numbered conflict artifacts — `name1`, `name2` etc. alongside `name` with
//      the same value (Tokens Studio appends a number when it can't overwrite an
//      existing token on push)
function dedupeLeaves(obj, path = '') {
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (!v || typeof v !== 'object') continue;

    // Leaf token — check for numbered conflict artifact: `foo1` alongside `foo`
    if ('$value' in v) {
      const m = k.match(/^(.+?)(\d+)$/);
      if (m) {
        const base = m[1];
        if (base in obj && obj[base]?.['$value'] === v['$value']) {
          delete obj[k];
          console.log(`  removed numbered artifact "${path ? path + '/' : ''}${k}"  →  kept "${base}"`);
          totalRemoved++;
        }
      }
      continue;
    }

    // Group node — check for rename artifact: `foo` alongside `foo-default`
    const defaultKey = `${k}-default`;
    if (defaultKey in obj) {
      const base = leafValues(v);
      const def  = leafValues(obj[defaultKey]);
      const bk = Object.keys(base).sort();
      const dk = Object.keys(def).sort();
      const same = bk.length > 0 &&
                   bk.join('\0') === dk.join('\0') &&
                   bk.every(key => base[key] === def[key]);
      if (same) {
        delete obj[k];
        console.log(`  removed stale group "${path ? path + '/' : ''}${k}"  →  kept "${defaultKey}"`);
        totalRemoved++;
        continue;
      }
    }

    dedupeLeaves(v, path ? `${path}/${k}` : k);
  }
}

for (const [setKey, tokenSet] of Object.entries(data)) {
  if (SKIP.has(setKey) || typeof tokenSet !== 'object' || tokenSet === null) continue;

  // Pass 1: leaf-level renames (e.g. tag-bg → tag-bg-default)
  dedupeLeaves(tokenSet, setKey);

  // Pass 2: group-level duplicates (e.g. Background → Bg → bg)
  const groups = Object.keys(tokenSet).filter(k => !k.startsWith('$'));
  const toRemove = new Set();

  for (let i = 0; i < groups.length; i++) {
    if (toRemove.has(groups[i])) continue;
    const cluster = [groups[i]];

    for (let j = i + 1; j < groups.length; j++) {
      if (toRemove.has(groups[j])) continue;
      if (identical(tokenSet[groups[i]], tokenSet[groups[j]])) {
        cluster.push(groups[j]);
      }
    }

    if (cluster.length > 1) {
      const keep = preferred(cluster);
      for (const name of cluster) {
        if (name !== keep) {
          toRemove.add(name);
          console.log(`  removed group "${name}"  →  kept "${keep}"  (${setKey})`);
          totalRemoved++;
        }
      }
    }
  }

  for (const name of toRemove) delete tokenSet[name];
}

fs.writeFileSync(TOKEN_FILE, JSON.stringify(data, null, 2) + '\n');
console.log(totalRemoved > 0
  ? `\nDone — removed ${totalRemoved} stale group(s).`
  : '\nDone — no duplicates found.'
);
