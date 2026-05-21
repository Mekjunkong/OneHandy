import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
      primary: 'bg-ink text-cream hover:bg-charcoal',
      outline: 'border border-ink text-ink bg-transparent hover:bg-ink hover:text-cream',
      ghost: 'text-ink bg-transparent hover:bg-black/5',
      gold: 'bg-gold text-ink hover:brightness-95',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs rounded-sm',
      md: 'px-6 py-3 text-sm rounded-sm',
      lg: 'px-8 py-4 text-sm rounded-sm',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
