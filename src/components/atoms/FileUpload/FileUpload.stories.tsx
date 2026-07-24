import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'atoms/FileUpload',
  component: FileUpload,
  parameters: { layout: 'padded' },
  argTypes: {
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    accept: { control: 'text' },
  },
  args: { multiple: true },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480, fontFamily: 'Outfit, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

const col: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  maxWidth: 480,
  fontFamily: 'Outfit, sans-serif',
};

export const Playground: Story = {};

export const SingleFile: Story = {
  parameters: { controls: { disable: true } },
  args: { multiple: false, accept: '.pdf,.doc,.docx' },
};

export const ImageOnly: Story = {
  parameters: { controls: { disable: true } },
  args: { accept: 'image/*', multiple: true },
};

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  args: { disabled: true },
};

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={col}>
      <FileUpload multiple accept="image/*" />
      <FileUpload disabled />
    </div>
  ),
};
