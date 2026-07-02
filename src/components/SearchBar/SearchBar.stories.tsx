import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: { layout: 'centered' },
  argTypes: {
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: { placeholder: 'Search courses…' },
  decorators: [
    (Story) => (
      <div style={{ width: 360, fontFamily: 'Outfit, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12, width: 360, fontFamily: 'Outfit, sans-serif' };

export const Default: Story = {};

export const WithValue: Story = {
  render: (args) => {
    const [val, setVal] = useState('TypeScript');
    return (
      <SearchBar
        {...args}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onClear={() => setVal('')}
      />
    );
  },
};

export const States: Story = {
  render: (args) => (
    <div style={col}>
      <SearchBar {...args} placeholder="Default" />
      <SearchBar {...args} placeholder="Loading…" loading />
      <SearchBar {...args} placeholder="Disabled" disabled />
    </div>
  ),
};

export const Playground: Story = {};
