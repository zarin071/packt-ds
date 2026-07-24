import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Tooltip } from './Tooltip';

// Radix Popper uses getBoundingClientRect for portal positioning,
// which is not implemented in jsdom. Tests that force the tooltip
// open are limited to static rendering checks only.

describe('Tooltip', () => {
  it('renders the trigger child', () => {
    render(
      <Tooltip content="Helpful info">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('renders without crashing when content is a string', () => {
    expect(() =>
      render(
        <Tooltip content="Simple tip">
          <button>Trigger</button>
        </Tooltip>
      )
    ).not.toThrow();
  });

  it('renders without crashing when content is a node', () => {
    expect(() =>
      render(
        <Tooltip content={<strong>Bold tip</strong>}>
          <button>Trigger</button>
        </Tooltip>
      )
    ).not.toThrow();
  });

  it('accepts a delayDuration prop', () => {
    expect(() =>
      render(
        <Tooltip content="Fast tip" delayDuration={0}>
          <button>Trigger</button>
        </Tooltip>
      )
    ).not.toThrow();
  });

  it('accepts all position values', () => {
    const positions = ['top', 'bottom', 'left', 'right'] as const;
    for (const position of positions) {
      expect(() =>
        render(
          <Tooltip content="Tip" position={position}>
            <button>Trigger</button>
          </Tooltip>
        )
      ).not.toThrow();
    }
  });

  it('has no accessibility violations on the trigger', async () => {
    const { container } = render(
      <Tooltip content="Info">
        <button>Info</button>
      </Tooltip>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
