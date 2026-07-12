import type { Meta, StoryObj } from '@storybook/react';
import { FeatureSpotlight } from './FeatureSpotlight';

const meta: Meta<typeof FeatureSpotlight> = {
  title: 'organisms/FeatureSpotlight',
  component: FeatureSpotlight,
  parameters: { layout: 'padded' },
  args: {
    eyebrow: 'Packt Hub',
    title: 'Stay ahead with expert tech insights',
    description:
      'Deep dives, tutorials, and industry analysis from working engineers — free on the Packt Hub.',
    ctaLabel: 'Visit the Hub',
    ctaHref: '#hub',
  },
};

export default meta;
type Story = StoryObj<typeof FeatureSpotlight>;

export const Playground: Story = {};

export const WithMedia: Story = {
  name: 'With media',
  parameters: { controls: { disable: true } },
  render: (args) => (
    <FeatureSpotlight
      {...args}
      media={
        <img
          src="https://picsum.photos/seed/packt-hub/420/260"
          alt=""
          style={{ borderRadius: 12, display: 'block', maxWidth: '100%' }}
        />
      }
    />
  ),
};
