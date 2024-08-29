import { HTMLAttributes, FC, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const boxVariants = cva(
  'w-full rounded-lg',
  {
    variants: {
      'variant': {
        'no-bg': 'p-6',
        'outer': 'bg-neutral-800/75 shadow-xl p-6',
        'inner': 'bg-neutral-900/75 shadow-xl p-4'
      }
    },
    defaultVariants: {
      'variant': 'outer'
    }
  }
)

interface BoxProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof boxVariants> { }

const Box: FC<BoxProps> = forwardRef<HTMLDivElement, BoxProps>(({ variant, className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(boxVariants({ variant, className }))}
      {...props}
    >
      {children}
    </div>
  )
})

export { Box, boxVariants }
