import StyleDictionary from 'style-dictionary';

StyleDictionary.registerTransform({
  name: 'number/px',
  type: 'value',
  filter: (token) => token.$type === 'number',
  transform: (token) => {
    const val = token.$value;
    if (val === 0 || val === '0') return '0';
    return `${val}px`;
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

StyleDictionary.registerTransformGroup({
  name: 'css/packt',
  transforms: [...StyleDictionary.hooks.transformGroups.css, 'number/px', 'fontWeight/numeric'],
});

StyleDictionary.registerFormat({
  name: 'css/dark-override',
  format: ({ dictionary }) => {
    const header = `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n`;
    const lines = dictionary.allTokens.map(token => {
      const name = `--${token.name.replace('semantic-colors-dark', 'semantic-colors-light')}`;
      return `  ${name}: ${token.$value};`;
    });
    return `${header}[data-theme="dark"] {\n${lines.join('\n')}\n}\n`;
  },
});

const PRIMITIVE_GROUPS = new Set([
  'Orange', 'Base', 'Green', 'Blue', 'Red', 'Yellow', 'neutral',
  'font-family', 'weight', 'letter-spacing', 'size', 'line-height',
  'Radius', 'Width', 'Space', 'Breakpoint', 'Unit',
]);

const sd = new StyleDictionary({
  source: ['tokens/design-tokens.json'],
  usesDtcg: true,
  log: { errors: { brokenReferences: 'warn' } },
  platforms: {
    css: {
      transformGroup: 'css/packt',
      prefix: 'packt',
      buildPath: 'src/tokens/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          filter: (token) =>
            token.path[0] !== 'theme' && token.path[0] !== 'Semantic-colors/Dark',
        },
        {
          destination: 'tokens.dark.css',
          format: 'css/dark-override',
          filter: (token) => token.path[0] === 'Semantic-colors/Dark',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
