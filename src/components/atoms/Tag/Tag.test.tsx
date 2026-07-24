import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders its children', () => {
    render(<Tag>JavaScript</Tag>);
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it.each(['brand', 'hub', 'neutral', 'error', 'warning', 'success', 'info'] as const)(
    'renders the %s variant without crashing',
    (variant) => {
      render(<Tag variant={variant}>Label</Tag>);
      expect(screen.getByText('Label')).toBeInTheDocument();
    }
  );

  it('does not render a remove button without onRemove', () => {
    render(<Tag>Python</Tag>);
    expect(screen.queryByRole('button', { name: 'Remove' })).not.toBeInTheDocument();
  });

  it('renders a remove button when onRemove is provided', () => {
    render(<Tag onRemove={vi.fn()}>Python</Tag>);
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
  });

  it('calls onRemove when the remove button is clicked', async () => {
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>Python</Tag>);
    await userEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('renders an icon when provided', () => {
    render(<Tag icon={<svg data-testid="tag-icon" />}>TypeScript</Tag>);
    expect(screen.getByTestId('tag-icon')).toBeInTheDocument();
  });

  it('forwards ref to the span element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Tag ref={ref}>Ref</Tag>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Tag onRemove={vi.fn()}>React</Tag>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
