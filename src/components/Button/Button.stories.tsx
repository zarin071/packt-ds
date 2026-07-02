import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { CheckIcon, ChevronDownIcon } from '../icons';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant:      { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size:         { control: 'select', options: ['sm', 'md', 'lg'] },
    label:        { control: 'text' },
    disabled:     { control: 'boolean' },
    loading:      { control: 'boolean' },
    iconPosition: { control: 'radio', options: ['start', 'end'] },
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
  args: { variant: 'primary', size: 'md', label: 'Button', disabled: false, loading: false },
};

export const WithIcon: Story = {
  name: 'With Icon',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button label="Confirm" icon={<CheckIcon />} />
      <Button label="Confirm" icon={<CheckIcon />} variant="secondary" />
      <Button label="Confirm" icon={<CheckIcon />} variant="ghost" />
      <Button label="Options" icon={<ChevronDownIcon />} iconPosition="end" variant="secondary" />
      <Button label="Options" icon={<ChevronDownIcon />} iconPosition="end" size="sm" variant="ghost" />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button label="Saving…" loading variant="primary" />
      <Button label="Saving…" loading variant="secondary" />
      <Button label="Saving…" loading variant="ghost" />
      <Button label="Deleting…" loading variant="danger" />
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
            <Button variant={variant} size="md" label="Button" />
            {rowLabel('loading')}
            <Button variant={variant} size="md" label="Saving…" loading />
            {rowLabel('disabled')}
            <Button variant={variant} size="md" label="Button" disabled />
          </div>
          <div data-theme="dark" style={{ ...surface('#1e1e1e'), flex: 1 }}>
            {rowLabel('default')}
            <Button variant={variant} size="md" label="Button" />
            {rowLabel('loading')}
            <Button variant={variant} size="md" label="Saving…" loading />
            {rowLabel('disabled')}
            <Button variant={variant} size="md" label="Button" disabled />
          </div>
        </div>
      ))}
    </div>
  ),
};
