import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary, { excludeParentKeys: false });

// ---------------------------------------------------------------------------
// Preprocessor: resolve Tokens Studio short-path references
//
// Builds a flat primitive value map, then walks every semantic token and:
//  • replaces {ref} with the resolved hex value (so SD has no broken refs)
//  • stores the original ref key in $extensions['packt.originalRef'] so the
//    packt/semantic-to-var transform can later emit var(--packt-primitive)
//    instead of the inline hex in tokens.light.css and tokens.dark.css.
// ---------------------------------------------------------------------------

const PRIMITIVE_SETS = new Set([
  'primitive-colors/default',
  'primitive-type/default',
  'border/default',
  'space/default',
  'breakpoints/default',
  'unit/default',
]);

function collectPrimitives(obj, prefix, out) {
  if (obj == null || typeof obj !== 'object') return;
  if ('$value' in obj) { out[prefix] = obj['$value']; return; }
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    collectPrimitives(val, prefix ? `${prefix}.${key}` : key, out);
  }
}

// Returns { value, singleRef } — singleRef is set only when the entire value
// was a single {ref} token (the common case for semantic color aliases).
function resolveRef(val, map, depth = 0) {
  if (depth > 10 || typeof val !== 'string') return { value: val };
  const refs = [];
  const value = val.replace(/\{([^}]+)\}/g, (_, ref) => {
    refs.push(ref);
    const r = map[ref];
    return r !== undefined ? resolveRef(r, map, depth + 1).value : `{${ref}}`;
  });
  return { value, singleRef: refs.length === 1 ? refs[0] : null };
}

function walkAndResolve(obj, map, isSemanticSet) {
  if (obj == null || typeof obj !== 'object') return;
  if ('$value' in obj) {
    const { value, singleRef } = resolveRef(obj['$value'], map);
    obj['$value'] = value;
    // Only track the original ref on semantic tokens so the var() transform
    // can target them without touching primitives.
    if (isSemanticSet && singleRef) {
      if (!obj['$extensions']) obj['$extensions'] = {};
      obj['$extensions']['packt.originalRef'] = singleRef;
    }
    return;
  }
  for (const v of Object.values(obj)) walkAndResolve(v, map, isSemanticSet);
}

StyleDictionary.registerPreprocessor({
  name: 'packt/resolve-ts-refs',
  preprocessor: (dictionary) => {
    const primitiveMap = {};
    for (const [setName, setTokens] of Object.entries(dictionary)) {
      if (setName.startsWith('$') || !PRIMITIVE_SETS.has(setName)) continue;
      collectPrimitives(setTokens, '', primitiveMap);
    }
    delete primitiveMap[''];

    for (const [setName, setTokens] of Object.entries(dictionary)) {
      if (setName.startsWith('$')) continue;
      const isSemantic = setName.includes('semantic-colors');
      walkAndResolve(setTokens, primitiveMap, isSemantic);
    }
    return dictionary;
  },
});

// ---------------------------------------------------------------------------
// Custom transforms
// ---------------------------------------------------------------------------

// Numeric tokens ($type "number") → px values.
StyleDictionary.registerTransform({
  name: 'number/px',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'number',
  transform: (token) => {
    const val = token.$value;
    return (val === 0 || val === '0') ? '0' : `${val}px`;
  },
});

// Figma percentage strings (e.g. "120%") → px.
StyleDictionary.registerTransform({
  name: 'unit/percentToPx',
  type: 'value',
  filter: (token) => typeof token.$value === 'string' && /^-?\d+(\.\d+)?%$/.test(token.$value),
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
    const p = token.path ?? [];
    return p[0] === 'weight' || p[p.length - 1] === 'weight';
  },
  transform: (token) => FONT_WEIGHT_MAP[token.$value] ?? token.$value,
});

// Converts semantic color token values to var(--packt-primitive) references
// so tokens.light.css / tokens.dark.css point into tokens.css rather than
// embedding inline hex. Primitive files keep their hex values unchanged.
StyleDictionary.registerTransform({
  name: 'packt/semantic-to-var',
  type: 'value',
  transitive: true,
  filter: (token) =>
    token.path[0].includes('semantic-colors') &&
    Boolean(token.$extensions?.['packt.originalRef']),
  transform: (token) => {
    const ref = token.$extensions['packt.originalRef'];
    // "neutral.black" → "var(--packt-neutral-black)"
    const varName = `--packt-${ref.toLowerCase().replace(/\./g, '-')}`;
    return `var(${varName})`;
  },
});

const PRIMITIVE_COLLECTIONS = new Set([
  'primitive-colors/default',
  'primitive-type/default',
  'border/default',
  'space/default',
  'breakpoints/default',
  'unit/default',
]);

// Name transform: kebab-case from path, strips collection wrappers.
StyleDictionary.registerTransform({
  name: 'name/packt',
  type: 'name',
  transform: (token, options) => {
    const prefix = options?.prefix ?? '';
    const pathParts = PRIMITIVE_COLLECTIONS.has(token.path[0])
      ? token.path.slice(1)
      : token.path;
    const parts = pathParts.map((p, i) => {
      let s = p.toLowerCase()
        .replace(/\s*\/\s*/g, '-')
        .replace(/\s+-\s+/g, '-')
        .replace(/\s+/g, '-');
      if (i === 0) s = s.replace(/^semantic-/, '').replace(/^colors-/, '');
      // Strip the redundant packt- prefix from group names inside semantic sets
      // e.g. packt-brand → brand, packt-hub → hub
      if (i === 1) s = s.replace(/^packt-/, '');
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
    'packt/semantic-to-var', // must run after color transforms
  ],
});

// ---------------------------------------------------------------------------
// Formats
// ---------------------------------------------------------------------------

StyleDictionary.registerFormat({
  name: 'css/light-theme',
  format: ({ dictionary }) => {
    const header = `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n`;
    const lines = dictionary.allTokens.map(t => `  --${t.name}: ${t.$value};`).join('\n');
    return `${header}[data-theme="light"] {\n${lines}\n}\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'css/dark-theme',
  format: ({ dictionary }) => {
    const header = `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n`;
    const lines = dictionary.allTokens.map(t => `  --${t.name}: ${t.$value};`).join('\n');
    return `${header}[data-theme="dark"] {\n${lines}\n}\n`;
  },
});

// Auto-generates tokens.theme.css — the theme-switching bridge.
// For every --packt-light-X in the light set, emits a theme-agnostic alias
// --packt-X that resolves to the light or dark variable depending on the
// active data-theme attribute. Components always reference --packt-X.
StyleDictionary.registerFormat({
  name: 'css/theme-bridge',
  format: ({ dictionary }) => {
    const header = `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n`;
    const tokens = dictionary.allTokens;

    const alias    = (t) => `--${t.name.replace(/-light-/, '-')}`;
    const lightVar = (t) => `var(--${t.name})`;
    const darkVar  = (t) => `var(--${t.name.replace(/-light-/, '-dark-')})`;

    const lightLines = tokens.map(t => `  ${alias(t)}: ${lightVar(t)};`).join('\n');
    const darkLines  = tokens.map(t => `  ${alias(t)}: ${darkVar(t)};`).join('\n');

    return (
      `${header}:root,\n[data-theme="light"] {\n${lightLines}\n}\n\n` +
      `[data-theme="dark"] {\n${darkLines}\n}\n`
    );
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
          // Primitive colors + spatial tokens only (:root).
          filter: (token) => {
            const set = token.path[0];
            if (set.startsWith('$')) return false;
            if (set === 'primitive-type/default') return false;
            if (set.includes('semantic-colors')) return false;
            return true;
          },
        },
        {
          destination: 'tokens.light.css',
          format: 'css/light-theme',
          filter: (token) => token.path[0] === 'semantic-colors/light',
        },
        {
          destination: 'tokens.dark.css',
          format: 'css/dark-theme',
          filter: (token) => token.path[0] === 'semantic-colors/dark',
        },
        {
          destination: 'tokens.theme.css',
          format: 'css/theme-bridge',
          // Source from light tokens — dark aliases are derived automatically.
          filter: (token) => token.path[0] === 'semantic-colors/light',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
