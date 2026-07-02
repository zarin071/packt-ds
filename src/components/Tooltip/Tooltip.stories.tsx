import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { InfoIcon } from '../icons';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  argTypes: {
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    content: { control: 'text' },
  },
  args: { content: 'Helpful information appears here', position: 'top' },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 48,
  padding: 64,
  fontFamily: 'Outfit, sans-serif',
};

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <button style={{ padding: '8px 16px', cursor: 'pointer' }}>Hover me</button>
    </Tooltip>
  ),
};

export const Positions: Story = {
  render: (args) => (
    <div style={grid}>
      {(['top', 'bottom', 'left', 'right'] as const).map((pos) => (
        <Tooltip key={pos} {...args} position={pos} content={`Tooltip — ${pos}`}>
          <button style={{ padding: '8px 16px', cursor: 'pointer' }}>{pos}</button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <Tooltip {...args} content="This course has been verified by our experts.">
      <span style={{ cursor: 'help', display: 'inline-flex', alignItems: 'center', fontSize: 20 }}>
        <InfoIcon />
      </span>
    </Tooltip>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <button style={{ padding: '8px 16px', cursor: 'pointer' }}>Trigger</button>
    </Tooltip>
  ),
};
