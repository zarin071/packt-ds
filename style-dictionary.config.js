import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

// Register TS color/math/size transforms (does NOT register the preprocessor
// because we handle collection-prefix resolution ourselves below).
register(StyleDictionary, { excludeParentKeys: false });

// ---------------------------------------------------------------------------
// Preprocessor: resolve Tokens Studio short-path references
//
// token.json uses multi-set Tokens Studio format. Primitive tokens live under
// collection keys like "Primitives-colors/default". Semantic tokens reference
// primitives with short paths e.g. {neutral.black} — but Style Dictionary
// expects the full path including the collection prefix, so refs go unresolved.
//
// This preprocessor:
//  1. Builds a flat value map from all primitive sets (key = short path without
//     the collection prefix, value = resolved hex/literal value).
//  2. Walks every token and replaces {ref} strings with their actual values
//     so Style Dictionary never has to chase cross-collection references.
// ---------------------------------------------------------------------------

const PRIMITIVE_SETS = new Set([
  'global',
  'Primitives-colors/default',
  'Primitive - Type/default',
  'Borders/default',
  'Space/default',
  'Layout/default',
  'Unit/base',
]);

function collectPrimitives(obj, prefix, out) {
  if (obj == null || typeof obj !== 'object') return;
  if ('$value' in obj) {
    out[prefix] = obj['$value'];
    return;
  }
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const path = prefix ? `${prefix}.${key}` : key;
    collectPrimitives(val, path, out);
  }
}

function resolveRef(val, map, depth = 0) {
  if (depth > 10 || typeof val !== 'string') return val;
  return val.replace(/\{([^}]+)\}/g, (_, ref) => {
    const resolved = map[ref];
    if (resolved === undefined) return `{${ref}}`;
    // Recursively resolve if the resolved value is itself a reference
    return resolveRef(resolved, map, depth + 1);
  });
}

function walkAndResolve(obj, map) {
  if (obj == null || typeof obj !== 'object') return;
  if ('$value' in obj) {
    obj['$value'] = resolveRef(obj['$value'], map);
    return;
  }
  for (const val of Object.values(obj)) {
    walkAndResolve(val, map);
  }
}

StyleDictionary.registerPreprocessor({
  name: 'packt/resolve-ts-refs',
  preprocessor: (dictionary) => {
    // Build primitive value map
    const primitiveMap = {};
    for (const [setName, setTokens] of Object.entries(dictionary)) {
      if (setName.startsWith('$') || !PRIMITIVE_SETS.has(setName)) continue;
      collectPrimitives(setTokens, '', primitiveMap);
    }

    // Remove empty-string key from leading dot in root-level calls
    delete primitiveMap[''];

    // Resolve all references in every token
    for (const val of Object.values(dictionary)) {
      walkAndResolve(val, primitiveMap);
    }

    return dictionary;
  },
});

// ---------------------------------------------------------------------------
// Custom transforms
// ---------------------------------------------------------------------------

// Numeric tokens (e.g. radius, spacing, type sizes) with $type "number" → px.
StyleDictionary.registerTransform({
  name: 'number/px',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'number',
  transform: (token) => {
    const val = token.$value;
    if (val === 0 || val === '0' || val === 0.0) return '0';
    return `${val}px`;
  },
});

// Percentage strings (e.g. "120%") from Figma → px.
StyleDictionary.registerTransform({
  name: 'unit/percentToPx',
  type: 'value',
  filter: (token) => {
    const val = token.$value;
    return typeof val === 'string' && /^-?\d+(\.\d+)?%$/.test(val);
  },
  transform: (token) => {
    const num = parseFloat(token.$value);
    return num === 0 ? '0' : `${num}px`;
  },
});

const FONT_WEIGHT_MAP = {
  Thin: 100, ExtraLight: 200, Light: 300, Regular: 400,
  Medium: 500, Semibold: 600, SemiBold: 600, Bold: 700,
  ExtraBold: 800, Black: 900,
};

StyleDictionary.registerTransform({
  name: 'fontWeight/numeric',
  type: 'value',
  filter: (token) => {
    const path = token.path ?? [];
    return path[0] === 'weight' || path[path.length - 1] === 'weight';
  },
  transform: (token) => FONT_WEIGHT_MAP[token.$value] ?? token.$value,
});

// Primitive collection names — the collection wrapper is stripped from the CSS
// variable name so e.g. "Primitives-colors/default.Orange.100" becomes
// "--packt-orange-100" rather than "--packt-primitives-colors-default-orange-100".
const PRIMITIVE_COLLECTIONS = new Set([
  'Primitives-colors/default',
  'Primitive - Type/default',
  'Borders/default',
  'Space/default',
  'Layout/default',
  'Unit/base',
]);

// Name transform: joins path segments with '-', lowercases, and replaces '/'
// and space characters from Tokens Studio collection names with '-'.
StyleDictionary.registerTransform({
  name: 'name/packt',
  type: 'name',
  transform: (token, options) => {
    const prefix = options?.prefix ?? '';
    // Strip collection wrapper for primitive sets; keep it for semantic sets.
    const pathParts = PRIMITIVE_COLLECTIONS.has(token.path[0])
      ? token.path.slice(1)
      : token.path;
    const parts = pathParts.map((p, i) => {
      let s = p.toLowerCase()
        .replace(/\s*\/\s*/g, '-')   // "Semantic-colors/Light" → "semantic-colors-light"
        .replace(/\s+-\s+/g, '-')    // "Semantic - Type" → "semantic-type"
        .replace(/\s+/g, '-');       // remaining spaces → dashes
      // Strip leading "semantic-" from the first path segment so
      // "semantic-colors-light" → "colors-light"
      // "semantic-type" → "type"
      if (i === 0) s = s.replace(/^semantic-/, '');
      return s;
    });
    return [prefix, ...parts].filter(Boolean).join('-');
  },
});

// ---------------------------------------------------------------------------
// Transform group
// ---------------------------------------------------------------------------

StyleDictionary.registerTransformGroup({
  name: 'css/packt',
  transforms: [
    'ts/resolveMath',
    'ts/size/px',
    'ts/opacity',
    'ts/typography/fontWeight',
    'ts/color/modifiers',
    'ts/color/css/hexrgba',
    'number/px',
    'unit/percentToPx',
    'fontWeight/numeric',
    'name/packt',
    'color/css',
    'fontFamily/css',
  ],
});

// ---------------------------------------------------------------------------
// Dark-mode format: emits [data-theme="dark"] overriding the same CSS variable
// names as the light tokens so consumers never change var() references.
// ---------------------------------------------------------------------------

// tokens.light.css format: light semantic colors in [data-theme="light"].
StyleDictionary.registerFormat({
  name: 'css/light-theme',
  format: ({ dictionary }) => {
    const header = `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n`;
    const lines = dictionary.allTokens
      .map(t => `  --${t.name}: ${t.$value};`)
      .join('\n');
    return `${header}[data-theme="light"] {\n${lines}\n}\n`;
  },
});

// tokens.dark.css format: dark semantic colors in [data-theme="dark"],
// using the same variable names as the light theme so consumers never
// need to change var() calls.
StyleDictionary.registerFormat({
  name: 'css/dark-override',
  format: ({ dictionary }) => {
    const header = `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n`;
    const lines = dictionary.allTokens.map(token => {
      const name = `--${token.name.replace('colors-dark', 'colors-light')}`;
      return `  ${name}: ${token.$value};`;
    });
    return `${header}[data-theme="dark"] {\n${lines.join('\n')}\n}\n`;
  },
});

// ---------------------------------------------------------------------------
// Style Dictionary config
// ---------------------------------------------------------------------------

const sd = new StyleDictionary({
  source: ['tokens/token.json'],
  usesDtcg: true,
  preprocessors: ['packt/resolve-ts-refs'],
  log: { verbosity: 'default', errors: { brokenReferences: 'warn' } },
  platforms: {
    css: {
      transformGroup: 'css/packt',
      prefix: 'packt',
      buildPath: 'src/tokens/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          // Primitives only: colors + spatial tokens.
          // Excludes primitive text, semantic colors, and semantic type.
          filter: (token) => {
            const set = token.path[0];
            if (set.startsWith('$')) return false;
            if (set === 'Primitive - Type/default') return false;
            if (set.includes('Semantic')) return false;
            return true;
          },
        },
        {
          destination: 'tokens.light.css',
          format: 'css/light-theme',
          filter: (token) => token.path[0].includes('Semantic-colors/Light'),
        },
        {
          destination: 'tokens.dark.css',
          format: 'css/dark-override',
          filter: (token) => token.path[0].includes('Semantic-colors/Dark'),
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
