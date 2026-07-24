import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { axe } from 'vitest-axe';
import { describe, it, expect, vi } from 'vitest';
import { RadioButton } from './RadioButton';

function RadioGroup({
  defaultValue,
  onValueChange,
}: {
  defaultValue?: string;
  onValueChange?: (v: string) => void;
}) {
  return (
    <RadioGroupPrimitive.Root
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      aria-label="Fruit"
    >
      <RadioButton value="apple" label="Apple" />
      <RadioButton value="banana" label="Banana" />
    </RadioGroupPrimitive.Root>
  );
}

describe('RadioButton', () => {
  it('renders a radio button with its label', () => {
    render(<RadioGroup />);
    expect(screen.getByRole('radio', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Banana' })).toBeInTheDocument();
  });

  it('reflects the selected value', () => {
    render(<RadioGroup defaultValue="banana" />);
    expect(screen.getByRole('radio', { name: 'Apple' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Banana' })).toBeChecked();
  });

  it('calls onValueChange when a different option is selected', async () => {
    const onValueChange = vi.fn();
    render(<RadioGroup onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole('radio', { name: 'Banana' }));
    expect(onValueChange).toHaveBeenCalledWith('banana');
  });

  it('shows an error message and sets aria-invalid', () => {
    render(
      <RadioGroupPrimitive.Root aria-label="Pick">
        <RadioButton value="x" label="Option" error="Required." />
      </RadioGroupPrimitive.Root>
    );
    const radio = screen.getByRole('radio', { name: 'Option' });
    expect(radio).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Required.')).toBeInTheDocument();
  });

  it('error message is linked via aria-describedby', () => {
    render(
      <RadioGroupPrimitive.Root aria-label="Pick">
        <RadioButton value="x" label="Option" error="Required." />
      </RadioGroupPrimitive.Root>
    );
    const radio = screen.getByRole('radio', { name: 'Option' });
    const errorId = radio.getAttribute('aria-describedby');
    expect(document.getElementById(errorId!)).toHaveTextContent('Required.');
  });

  it('is disabled and cannot be selected', async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroupPrimitive.Root aria-label="Pick" onValueChange={onValueChange}>
        <RadioButton value="x" label="Locked" disabled />
      </RadioGroupPrimitive.Root>
    );
    const radio = screen.getByRole('radio', { name: 'Locked' });
    expect(radio).toBeDisabled();
    await userEvent.click(radio);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<RadioGroup />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
