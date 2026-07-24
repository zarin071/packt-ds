import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders a title', () => {
    render(<Card title="React Cookbook" />);
    expect(screen.getByRole('heading', { name: 'React Cookbook' })).toBeInTheDocument();
  });

  it('renders a description', () => {
    render(<Card description="Learn React patterns." />);
    expect(screen.getByText('Learn React patterns.')).toBeInTheDocument();
  });

  it('renders children inside the content area', () => {
    render(<Card><p>Custom content</p></Card>);
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  it('renders an image with alt text when imageSrc is provided', () => {
    render(<Card imageSrc="/cover.jpg" imageAlt="Book cover" title="Title" />);
    expect(screen.getByRole('img', { name: 'Book cover' })).toHaveAttribute('src', '/cover.jpg');
  });

  it('does not render an image without imageSrc', () => {
    render(<Card title="Title" />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    render(<Card title="Title" actions={<button>Buy now</button>} />);
    expect(screen.getByRole('button', { name: 'Buy now' })).toBeInTheDocument();
  });

  it('does not render an actions row without actions prop', () => {
    const { container } = render(<Card title="Title" />);
    // actions row has a border-t class; if it's absent there's no border-t div
    expect(container.querySelector('.border-t')).not.toBeInTheDocument();
  });

  it('forwards ref to the root div', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref} title="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Card title="Python Crash Course" description="A great beginner book." imageSrc="/py.jpg" imageAlt="Python book cover" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
