import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, LabelHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const labelVariants = cva(
  'font-bold text-nowrap pr-4',
  {
    variants: {},
    defaultVariants: {}
  }
)

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> { }

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, children, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={twMerge(labelVariants({}), className)}
      {...props}
    >
      {children}
    </label>
  )
})

export { Label, labelVariants }
