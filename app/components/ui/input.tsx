import { FC, forwardRef, InputHTMLAttributes } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const inputVariants = cva(
  'focus:outline-none bg-transparent border-b p-0 m-0 h-full w-32 text-white focus:text-amber-500 border-white focus:border-amber-500',
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
      className={twMerge(inputVariants({ className }))}
      {...props}
    />
  )
})

export { Input, inputVariants }
