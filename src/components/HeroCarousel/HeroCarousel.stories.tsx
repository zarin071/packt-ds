import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HeroCarousel } from './HeroCarousel';
import { Button } from '../Button';

const meta: Meta<typeof HeroCarousel> = {
  title: 'organisms/HeroCarousel',
  component: HeroCarousel,
  parameters: { layout: 'padded' },
  argTypes: { slides: { control: false } },
};

export default meta;
type Story = StoryObj<typeof HeroCarousel>;

const slideStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 12,
  padding: '48px 40px',
  minHeight: 240,
};

function Promo({ title, copy, cta }: { title: string; copy: string; cta: string }): ReactNode {
  return (
    <div style={slideStyle} className="bg-brand-bg-default">
      <h2 className="m-0 text-2xl font-bold text-content-primary">{title}</h2>
      <p className="m-0 max-w-md text-sm text-content-secondary">{copy}</p>
      <Button variant="primary">{cta}</Button>
    </div>
  );
}

export const Playground: Story = {
  args: {
    label: 'Featured offers',
    slides: [
      { id: 'sale', content: <Promo title="Spring Sale — up to 50% off" copy="Thousands of e-books and video courses at half price, this week only." cta="Shop the sale" /> },
      { id: 'sub', content: <Promo title="Packt Unlimited" copy="Every book. Every video. One subscription." cta="Start free trial" /> },
      { id: 'new', content: <Promo title="New releases" copy="Fresh titles on AI, cloud, and modern web development." cta="Browse new titles" /> },
    ],
  },
};
