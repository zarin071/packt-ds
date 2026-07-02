import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
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

const col: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480, fontFamily: 'Outfit, sans-serif' };

export const Default: Story = {};

export const SingleFile: Story = {
  args: { multiple: false, accept: '.pdf,.doc,.docx' },
};

export const ImageOnly: Story = {
  args: { accept: 'image/*', multiple: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Playground: Story = {};
