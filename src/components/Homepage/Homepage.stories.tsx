import type { Meta, StoryObj } from '@storybook/react';
import { PacktHomePage } from './PacktHomePage';

const meta: Meta<typeof PacktHomePage> = {
  title: 'Pages/Homepage',
  component: PacktHomePage,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { story: 'Full Packt homepage composed from design-system components.' } },
  },
};

export default meta;
type Story = StoryObj<typeof PacktHomePage>;

export const Default: Story = {};
