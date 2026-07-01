import './Button.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  label: string;
  disabled?: boolean;
  theme?: 'light' | 'dark';
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  label,
  disabled = false,
  theme = 'light',
}: ButtonProps) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size} btn--${theme}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
