import { HTMLAttributes, FC, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const boxVariants = cva(
  'w-full bg-black/50 p-6 rounded-lg',
  {
    variants: {},
    defaultVariants: {}
  }
)

interface BoxProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof boxVariants> { }

const Box: FC<BoxProps> = forwardRef<HTMLDivElement, BoxProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(boxVariants({ className }))}
      {...props}
    >
      {children}
    </div>
  )
})

export { Box, boxVariants }
