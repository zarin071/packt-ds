import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'components/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showLabel: { control: 'boolean' },
  },
  args: { value: 65, size: 'md', showLabel: true },
  decorators: [
    (Story) => (
      <div style={{ width: 400, fontFamily: 'Outfit, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16, width: 400, fontFamily: 'Outfit, sans-serif' };

export const Playground: Story = {};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={col}>
      <ProgressBar {...args} size="sm" label="Small" showLabel />
      <ProgressBar {...args} size="md" label="Medium" showLabel />
      <ProgressBar {...args} size="lg" label="Large" showLabel />
    </div>
  ),
};

export const Values: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={col}>
      <ProgressBar {...args} value={0} label="0%" showLabel />
      <ProgressBar {...args} value={25} label="25%" showLabel />
      <ProgressBar {...args} value={75} label="75%" showLabel />
      <ProgressBar {...args} value={100} label="Complete" showLabel />
    </div>
  ),
};

export const NoLabel: Story = {
  parameters: { controls: { disable: true } },
  args: { showLabel: false },
};
