import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    interactive: { control: 'boolean' },
  },
  args: {
    title: "React – The Complete Developer's Guide",
    description: 'Master React 18, hooks, Redux Toolkit, and TypeScript through hands-on projects.',
    interactive: false,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const row: CSSProperties = {
  display: 'flex',
  gap: 16,
  flexWrap: 'wrap',
  fontFamily: 'Outfit, sans-serif',
  alignItems: 'flex-start',
};

export const Playground: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 320, fontFamily: 'Outfit, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithImage: Story = {
  parameters: { controls: { disable: true } },
  args: {
    imageSrc: 'https://placehold.co/600x338/f97141/ffffff?text=Course',
    imageAlt: 'Course thumbnail',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, fontFamily: 'Outfit, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
};

export const Interactive: Story = {
  parameters: { controls: { disable: true } },
  args: { interactive: true },
  decorators: [
    (Story) => (
      <div style={{ width: 320, fontFamily: 'Outfit, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
};

export const Grid: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={row}>
      {['JavaScript Essentials', 'Python for Data Science', 'AWS Certified Developer'].map((title) => (
        <Card
          key={title}
          title={title}
          description="Hands-on projects to build real skills."
          interactive
          style={{ width: 280 }}
        />
      ))}
    </div>
  ),
};
