import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant:  { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    theme:    { control: 'radio',  options: ['light', 'dark'] },
    label:    { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const surface = (bg: string): CSSProperties => ({
  background: bg,
  padding: '20px 24px',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  flexWrap: 'wrap',
});

const rowLabel = (text: string) => (
  <span style={{ fontSize: 11, fontFamily: 'Outfit, sans-serif', color: '#797979', minWidth: 64 }}>
    {text}
  </span>
);

export const Playground: Story = {
  args: { variant: 'primary', size: 'md', theme: 'light', label: 'Button', disabled: false },
  render: ({ theme, ...args }) => (
    <div style={{
      background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
      padding: '32px 40px',
      borderRadius: 8,
    }}>
      <Button theme={theme} {...args} />
    </div>
  ),
};

const VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Outfit, sans-serif' }}>
      <div style={{ display: 'flex', gap: 4, paddingBottom: 4 }}>
        <div style={{ width: 80 }} />
        <div style={{ ...surface('transparent'), flex: 1, justifyContent: 'center', padding: '4px 24px', color: '#4d4d4d', fontSize: 12, fontWeight: 600 }}>Light</div>
        <div style={{ ...surface('transparent'), flex: 1, justifyContent: 'center', padding: '4px 24px', color: '#4d4d4d', fontSize: 12, fontWeight: 600 }}>Dark</div>
      </div>

      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'stretch', gap: 4 }}>
          <div style={{ width: 80, display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#797979', textTransform: 'capitalize' }}>{variant}</span>
          </div>
          <div style={{ ...surface('#ffffff'), flex: 1 }}>
            {rowLabel('default')}
            <Button variant={variant} size="md" theme="light" label="Button" />
            {rowLabel('disabled')}
            <Button variant={variant} size="md" theme="light" label="Button" disabled />
          </div>
          <div style={{ ...surface('#1e1e1e'), flex: 1 }}>
            {rowLabel('default')}
            <Button variant={variant} size="md" theme="dark" label="Button" />
            {rowLabel('disabled')}
            <Button variant={variant} size="md" theme="dark" label="Button" disabled />
          </div>
        </div>
      ))}
    </div>
  ),
};
