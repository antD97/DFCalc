import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
  'px-4 rounded',
  {
    variants: {
      'variant': {
        'primary': 'border text-amber-500 border-amber-500 hover:bg-black/30 disabled:opacity-50 disabled:bg-transparent',
        'white': 'border hover:bg-white/10 disabled:opacity-50 disabled:bg-transparent',
      }
    },
    defaultVariants: {
      'variant': 'white'
    }
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant, className, ...props }, ref) => (
  <button ref={ref} className={twMerge(buttonVariants({ variant }), className)} {...props} />
));

interface StateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { isEnabled: boolean; }

const StateButton = forwardRef<HTMLButtonElement, StateButtonProps>(({ isEnabled, className, ...props }, ref) => {
  const cn = isEnabled ? 'text-neutral-900 bg-amber-500 border-transparent hover:bg-amber-500 hover:cursor-default' : 'opacity-50';
  return (
    <Button
      variant="white"
      className={twMerge(cn, className)}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";
StateButton.displayName = "StateButton";

export { Button, StateButton, buttonVariants };
