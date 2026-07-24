import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { TabGroup } from './TabGroup';

const items = [
  { value: 'books', label: 'Books', content: 'Books panel' },
  { value: 'videos', label: 'Videos', content: 'Videos panel' },
  { value: 'audiobooks', label: 'Audiobooks', content: 'Audiobooks panel' },
];

describe('TabGroup', () => {
  it('renders a labelled tablist with one tab per item', () => {
    render(<TabGroup items={items} label="Content type" />);
    expect(screen.getByRole('tablist', { name: 'Content type' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('activates the first item by default and shows its panel', () => {
    render(<TabGroup items={items} label="Content type" />);
    expect(screen.getByRole('tab', { name: 'Books' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Books panel')).toBeVisible();
  });

  it('supports arrow-key navigation between tabs', async () => {
    render(<TabGroup items={items} label="Content type" />);
    await userEvent.tab(); // focus first tab
    expect(screen.getByRole('tab', { name: 'Books' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Videos' })).toHaveFocus();
  });

  it('respects a custom defaultValue', () => {
    render(<TabGroup items={items} label="Content type" defaultValue="videos" />);
    expect(screen.getByRole('tab', { name: 'Videos' })).toHaveAttribute('aria-selected', 'true');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<TabGroup items={items} label="Content type" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
