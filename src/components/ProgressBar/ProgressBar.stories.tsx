import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    showLabel: { control: 'boolean' },
  },
  args: { value: 65, size: 'medium', showLabel: true },
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

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={col}>
      <ProgressBar {...args} size="small" label="Small" showLabel />
      <ProgressBar {...args} size="medium" label="Medium" showLabel />
      <ProgressBar {...args} size="large" label="Large" showLabel />
    </div>
  ),
};

export const Values: Story = {
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
  args: { showLabel: false },
};

export const Playground: Story = {};
