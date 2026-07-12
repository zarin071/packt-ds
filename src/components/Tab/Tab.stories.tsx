import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab, TabList, TabPanel } from './Tab';
import { InfoIcon, SearchIcon, FileIcon } from '../icons';

const meta: Meta<typeof Tab> = {
  title: 'components/Tab',
  component: Tab,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const Playground: Story = {
  args: { value: 'overview', children: 'Overview' },
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: (args) => (
    <Tabs defaultValue="overview">
      <TabList aria-label="Example tabs">
        <Tab {...args} />
        <Tab value="curriculum">Curriculum</Tab>
        <Tab value="reviews">Reviews</Tab>
      </TabList>
    </Tabs>
  ),
};

export const WithPanels: Story = {
  name: 'With panels',
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabs defaultValue="overview" style={{ width: 480 }}>
      <TabList aria-label="Course sections">
        <Tab value="overview" icon={<InfoIcon />}>Overview</Tab>
        <Tab value="curriculum" icon={<FileIcon />}>Curriculum</Tab>
        <Tab value="reviews" icon={<SearchIcon />}>Reviews</Tab>
      </TabList>
      <TabPanel value="overview">A high-level summary of the course.</TabPanel>
      <TabPanel value="curriculum">The full lesson-by-lesson breakdown.</TabPanel>
      <TabPanel value="reviews">What learners are saying.</TabPanel>
    </Tabs>
  ),
};

export const DisabledTab: Story = {
  name: 'Disabled tab',
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabs defaultValue="overview">
      <TabList aria-label="Example tabs">
        <Tab value="overview">Overview</Tab>
        <Tab value="curriculum">Curriculum</Tab>
        <Tab value="locked" disabled>Locked</Tab>
      </TabList>
    </Tabs>
  ),
};
