import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Tabs, Tab, TabList, TabPanel } from './Tab';

function Example() {
  return (
    <Tabs defaultValue="a">
      <TabList aria-label="Example tabs">
        <Tab value="a">First</Tab>
        <Tab value="b">Second</Tab>
        <Tab value="c" disabled>
          Locked
        </Tab>
      </TabList>
      <TabPanel value="a">Panel A</TabPanel>
      <TabPanel value="b">Panel B</TabPanel>
      <TabPanel value="c">Panel C</TabPanel>
    </Tabs>
  );
}

describe('Tab', () => {
  it('renders tabs with the tab role and a labelled tablist', () => {
    render(<Example />);
    expect(screen.getByRole('tablist', { name: 'Example tabs' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('marks the default tab as selected and shows its panel', () => {
    render(<Example />);
    expect(screen.getByRole('tab', { name: 'First' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Panel A')).toBeVisible();
  });

  it('switches the active tab and panel on click', async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole('tab', { name: 'Second' }));
    expect(screen.getByRole('tab', { name: 'Second' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Panel B')).toBeVisible();
  });

  it('disables a tab via the disabled prop', () => {
    render(<Example />);
    expect(screen.getByRole('tab', { name: 'Locked' })).toBeDisabled();
  });

  it('forwards ref to the trigger', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Tabs defaultValue="a">
        <TabList aria-label="t">
          <Tab value="a" ref={ref}>
            First
          </Tab>
        </TabList>
      </Tabs>
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Example />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
