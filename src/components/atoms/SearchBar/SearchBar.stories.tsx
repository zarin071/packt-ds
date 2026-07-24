import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'atoms/SearchBar',
  component: SearchBar,
  parameters: { layout: 'centered' },
  argTypes: {
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    onSearch: { action: 'onSearch' },
  },
  args: { placeholder: 'Search courses…', onSearch: fn() },
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

const col: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: 360,
  fontFamily: 'Outfit, sans-serif',
};

export const Playground: Story = {
  render: (args) => {
    const [val, setVal] = useState('');
    return (
      <SearchBar {...args} value={val} onChange={(e) => setVal(e.target.value)} onClear={() => setVal('')} />
    );
  },
};

export const WithValue: Story = {
  parameters: { controls: { disable: true } },
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
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={col}>
      <SearchBar {...args} placeholder="Default" />
      <SearchBar {...args} placeholder="Loading…" loading />
      <SearchBar {...args} placeholder="Disabled" disabled />
    </div>
  ),
};
