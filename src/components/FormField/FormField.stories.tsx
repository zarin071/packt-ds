import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'molecules/FormField',
  component: FormField,
  parameters: { layout: 'centered' },
  args: { label: 'Email address', type: 'email', placeholder: 'you@example.com' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Playground: Story = {};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}>
      <FormField label="Email" type="email" helperText="We'll never share your email." />
      <FormField label="Email" type="email" required defaultValue="not-an-email" errorMessage="Enter a valid email address." />
      <FormField label="Company" disabled placeholder="Disabled" />
    </div>
  ),
};
