import { VariantProps, cva } from 'class-variance-authority'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const buttonVariants = cva(
  'shadow active:shadow-none px-4 rounded',
  {
    variants: {
      'variant': {
        'primary': 'bg-amber-500 disabled:bg-amber-500 hover:bg-amber-400 active:bg-amber-300 text-black',
        'white': 'bg-neutral-100 disabled:bg-neutral-100 hover:bg-neutral-300 active:bg-neutral-400 text-black',
      }
    },
    defaultVariants: {
      'variant': 'white'
    }
  }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant, className, children, ...props }, ref) => {
  return (
    <button ref={ref} className={twMerge(buttonVariants({ variant }), className)} {...props}>
      {children}
    </button>
  )
})

export { Button, buttonVariants }
