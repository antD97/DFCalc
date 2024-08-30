import { HTMLAttributes, FC, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const boxVariants = cva(
  'w-full',
  {
    variants: {
      'variant': {
        'no-bg': 'p-6',
        'outer': 'bg-neutral-800/75 shadow-xl p-6',
        'inner': 'bg-neutral-900/60 shadow p-4'
      },
      'maxWidth': {
        'large': 'max-w-screen-lg rounded-none lg:rounded-lg',
        'small': 'max-w-screen-sm rounded-none sm:rounded-lg',
        'none': 'rounded-lg'
      }
    },
    defaultVariants: {
      'variant': 'outer',
      'maxWidth': 'large'
    }
  }
)

interface BoxProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof boxVariants> { }

const Box: FC<BoxProps> = forwardRef<HTMLDivElement, BoxProps>(({ variant, maxWidth, className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(boxVariants({ variant, maxWidth, className }))}
      {...props}
    >
      {children}
    </div>
  )
})

export { Box, boxVariants }
