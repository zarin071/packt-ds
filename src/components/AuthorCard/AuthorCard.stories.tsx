import type { Meta, StoryObj } from '@storybook/react';
import { AuthorCard } from './AuthorCard';

const meta: Meta<typeof AuthorCard> = {
  title: 'organisms/AuthorCard',
  component: AuthorCard,
  parameters: { layout: 'centered' },
  argTypes: { links: { control: false } },
  args: {
    name: 'Juntao Qiu',
    role: 'Author of React Anti-Patterns',
    initials: 'JQ',
    bio: 'Juntao is a software engineer and author who helps teams write cleaner, more maintainable front-end code. He has spent a decade building large React applications and teaching patterns that scale.',
    links: [
      { platform: 'github', url: 'https://github.com/example' },
      { platform: 'twitter', url: 'https://x.com/example' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/example' },
    ],
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof AuthorCard>;

export const Playground: Story = {};

export const Minimal: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 360 }}>
      <AuthorCard name="Ada Byron" initials="AB" />
    </div>
  ),
};
