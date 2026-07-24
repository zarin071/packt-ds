import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

const isCI = Boolean(process.env.GITHUB_ACTIONS);

const config: StorybookConfig = {
  viteFinal: async (viteConfig) => {
    if (isCI) {
      viteConfig.base = '/packt-ds/';
    }
    return viteConfig;
  },
  stories: [
    '../docs/introduction.mdx',
    '../docs/DeveloperGuide.mdx',
    '../docs/**/*.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/react-vite',
};

export default config;
