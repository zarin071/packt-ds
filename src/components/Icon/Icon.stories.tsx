import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { CheckIcon } from '../icons';

const meta: Meta<typeof Icon> = {
  title: 'components/Icon',
  component: Icon,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { size: 'md', children: <CheckIcon /> },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Icon size="sm">
        <CheckIcon />
      </Icon>
      <Icon size="md">
        <CheckIcon />
      </Icon>
      <Icon size="lg">
        <CheckIcon />
      </Icon>
    </div>
  ),
};
