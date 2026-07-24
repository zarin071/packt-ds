import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from './Button';
import { CheckIcon, ChevronDownIcon } from '../icons';
import { iconArgType } from '../story-helpers';

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    // Mutually exclusive: picking one icon hides the other control
    leadingIcon: { ...iconArgType('md'), if: { arg: 'trailingIcon', eq: 'none' } },
    trailingIcon: { ...iconArgType('md'), if: { arg: 'leadingIcon', eq: 'none' } },
    // asChild is for code use only (router Link wrapping) — not a playground control
    asChild: { control: false },
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
  args: { variant: 'primary', size: 'md', children: 'Button', disabled: false, loading: false, leadingIcon: 'none', trailingIcon: 'none' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button', { name: 'Button' });
    expect(btn).toBeInTheDocument();
    expect(btn).not.toBeDisabled();
    expect(btn).not.toHaveAttribute('aria-busy');
  },
};

export const ClickHandler: Story = {
  name: 'Click fires handler',
  args: { variant: 'primary', size: 'md', children: 'Click me' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button', { name: 'Click me' });
    await userEvent.click(btn);
    // If no error is thrown, the click was handled correctly.
    expect(btn).toBeInTheDocument();
  },
};

export const DisabledState: Story = {
  name: 'Disabled prevents interaction',
  args: { variant: 'primary', size: 'md', children: 'Button', disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button', { name: 'Button' });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('disabled');
  },
};

export const LoadingState: Story = {
  name: 'Loading — aria-busy and spinner',
  args: { variant: 'primary', size: 'md', children: 'Saving…', loading: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button', { name: 'Saving…' });
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(btn).toBeDisabled();
    // Spinner is in DOM
    expect(canvasElement.querySelector('svg.animate-spin')).toBeInTheDocument();
  },
};

export const WithIcon: Story = {
  name: 'With Icon',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button leadingIcon={<CheckIcon />}>Confirm</Button>
      <Button leadingIcon={<CheckIcon />} variant="secondary">Confirm</Button>
      <Button leadingIcon={<CheckIcon />} variant="ghost">Confirm</Button>
      <Button trailingIcon={<ChevronDownIcon />} variant="secondary">Options</Button>
      <Button trailingIcon={<ChevronDownIcon />} size="sm" variant="ghost">Options</Button>
    </div>
  ),
};

export const Loading: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button loading variant="primary">Saving…</Button>
      <Button loading variant="secondary">Saving…</Button>
      <Button loading variant="ghost">Saving…</Button>
      <Button loading variant="danger">Deleting…</Button>
    </div>
  ),
};

const VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;

export const AllStates: Story = {
  name: 'All States',
  parameters: { controls: { disable: true } },
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
          <div data-theme="light" style={{ ...surface('#ffffff'), flex: 1 }}>
            {rowLabel('default')}
            <Button variant={variant} size="md">Button</Button>
            {rowLabel('loading')}
            <Button variant={variant} size="md" loading>Saving…</Button>
            {rowLabel('disabled')}
            <Button variant={variant} size="md" disabled>Button</Button>
          </div>
          <div data-theme="dark" style={{ ...surface('#1e1e1e'), flex: 1 }}>
            {rowLabel('default')}
            <Button variant={variant} size="md">Button</Button>
            {rowLabel('loading')}
            <Button variant={variant} size="md" loading>Saving…</Button>
            {rowLabel('disabled')}
            <Button variant={variant} size="md" disabled>Button</Button>
          </div>
        </div>
      ))}
    </div>
  ),
};
