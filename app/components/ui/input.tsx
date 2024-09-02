import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const inputVariants = cva(
  'focus:outline-none disabled:text-white/50 bg-transparent border-b p-0 m-0 w-32 text-white focus:text-amber-500 border-white focus:border-amber-500 min-w-0 w-full',
  {
    variants: {},
    defaultVariants: {}
  }
)

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> { }

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={twMerge(inputVariants({}), className)}
      {...props}
    />
  )
})

export { Input, inputVariants }
