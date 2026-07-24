import '../src/tokens/tokens.css';
import '../src/tokens/tokens.light.css';
import '../src/tokens/tokens.dark.css';
import '../src/tokens/tokens.helpers.css';
import '../src/styles/tailwind.css';
// Material Symbols bundled locally — no CDN required in Storybook
import '@fontsource-variable/material-symbols-outlined/full.css';
import { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { addons } from 'storybook/preview-api';

/**
 * Module-level channel listener.
 * Runs once when the preview iframe loads — before any component mounts.
 * This is the only reliable way to theme pure-prose docs pages (Foundation,
 * Introduction, DeveloperGuide) that have no Canvas blocks and therefore
 * never render a story through the decorator.
 */
if (typeof document !== 'undefined') {
  const applyTheme = (theme: string) =>
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');

  applyTheme('light'); // default until a SET_GLOBALS fires

  try {
    const ch = addons.getChannel();
    ch.on('GLOBALS_UPDATED', ({ globals }: any) => applyTheme(globals?.theme));
    ch.on('SET_GLOBALS',     ({ globals }: any) => applyTheme(globals?.theme));
  } catch {
    // Channel not yet ready — decorator handles it on first story render
  }
}

// ---------------------------------------------------------------------------
// Storybook theme objects passed to DocsContainer.
// These change the docs typography, code-block syntax highlighting, table
// colours, and every other element Storybook styles itself — without relying
// on fragile CSS class-name overrides.
// ---------------------------------------------------------------------------
const SB_LIGHT = {
  base: 'light' as const,
  colorPrimary:    '#f97141',
  colorSecondary:  '#f97141',
  appBg:           '#f6f6f6',   // --packt-bg-page light
  appContentBg:    '#ffffff',   // --packt-bg-surface light
  appBorderColor:  '#e4e4e4',   // --packt-border-default light
  textColor:       '#000000',   // --packt-content-primary light
  textMutedColor:  '#797979',   // --packt-content-tertiary light
  barBg:           '#ffffff',
  barTextColor:    '#797979',
  barSelectedColor:'#f97141',
  inputBg:         '#ffffff',
  inputBorder:     '#e4e4e4',
  inputTextColor:  '#000000',
};

const SB_DARK = {
  base: 'dark' as const,
  colorPrimary:    '#f97141',
  colorSecondary:  '#f97141',
  appBg:           '#1a1a1a',   // --packt-bg-page dark
  appContentBg:    '#1f1f1f',   // --packt-bg-surface dark
  appBorderColor:  '#2d2d2d',
  textColor:       '#ffffff',   // --packt-content-primary dark
  textMutedColor:  '#a6a6a6',
  barBg:           '#1f1f1f',
  barTextColor:    '#a6a6a6',
  barSelectedColor:'#f97141',
  inputBg:         '#1f1f1f',
  inputBorder:     '#2d2d2d',
  inputTextColor:  '#ffffff',
};

// ---------------------------------------------------------------------------
// Custom docs container.
// Wraps every docs page — component docs AND standalone MDX (Foundation,
// Introduction, etc.) — in a data-theme div so our inline CSS variables
// resolve correctly, and passes the matching Storybook theme object so
// Storybook-owned elements (prose, code blocks, tables) adapt too.
// ---------------------------------------------------------------------------
function ThemedDocsContainer({ children, context, ...rest }: any) {
  const theme  = (context?.globals?.theme as string) === 'dark' ? 'dark' : 'light';
  const isDark = theme === 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div data-theme={theme}>
      <DocsContainer context={context} theme={isDark ? SB_DARK : SB_LIGHT} {...rest}>
        {children}
      </DocsContainer>
    </div>
  );
}

// ---------------------------------------------------------------------------

export const globalTypes = {
  theme: {
    description: 'Component theme',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'contrast',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark',  title: 'Dark',  icon: 'moon' },
      ],
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    layout: 'centered',
    docs: {
      container: ThemedDocsContainer,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
    a11y: { test: 'todo' },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as 'light' | 'dark') ?? 'light';
      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);

      return (
        <div data-theme={theme} style={{ fontFamily: 'var(--font-sans)', color: 'var(--packt-content-primary)' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
