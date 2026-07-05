import '../src/tokens/tokens.css';
import '../src/tokens/tokens.light.css';
import '../src/tokens/tokens.dark.css';
import '../src/components/tokens.helpers.css';
import '../src/styles/tailwind.css';
import { useEffect } from 'react';
import type { Preview } from '@storybook/react';

/**
 * Global theme switch — adds a Light/Dark toggle to the Storybook toolbar.
 * Every story (including Playground) can be viewed in either theme.
 */
export const globalTypes = {
  theme: {
    description: 'Component theme',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'contrast',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' },
      ],
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme as 'light' | 'dark') ?? 'light';
      // Drive the whole preview iframe: CSS custom props cascade from <html>,
      // so the page background and every token-based utility follow the toggle.
      useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        document.body.style.background = 'var(--packt-background-page)';
        document.body.style.transition = 'background 120ms ease';
      }, [theme]);

      return (
        <div
          data-theme={theme}
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--packt-content-primary)',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
