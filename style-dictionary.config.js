import StyleDictionary from 'style-dictionary';

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
      transformGroup: 'css',
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
          format: 'css/variables',
          filter: (token) => token.path[0] === 'Semantic-colors/Dark',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
