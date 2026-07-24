import type { Meta, StoryObj } from '@storybook/react';
import { SocialLinks } from './SocialLinks';

const meta: Meta<typeof SocialLinks> = {
  title: 'molecules/SocialLinks',
  component: SocialLinks,
  parameters: { layout: 'centered' },
  argTypes: { links: { control: false } },
  args: {
    links: [
      { platform: 'github', url: 'https://github.com/PacktPublishing' },
      { platform: 'twitter', url: 'https://twitter.com/PacktPub' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/company/packt-publishing' },
      { platform: 'youtube', url: 'https://www.youtube.com/user/PacktProgramming' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SocialLinks>;

export const Playground: Story = {};

export const Subset: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <SocialLinks
      links={[
        { platform: 'github', url: 'https://github.com/PacktPublishing' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/company/packt-publishing' },
      ]}
    />
  ),
};
