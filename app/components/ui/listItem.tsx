'use client';

import { isInTooltipTitle } from '@/app/components/ui/tooltip'
import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const listItemVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: 'ml-4',
        tooltip: 'ml-3 text-sm'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

interface ListItemProps extends HTMLAttributes<HTMLLIElement>, VariantProps<typeof listItemVariants> { }

const LI = forwardRef<HTMLLIElement, ListItemProps>(({ variant, className, children, ...props }, ref) => {
  if (!variant && isInTooltipTitle()) { variant = 'tooltip'; }

  return (
    <li
      ref={ref}
      className={twMerge(listItemVariants({ variant }), className)}
      {...props}
    >
      {children}
    </li>
  )
})

export { LI, listItemVariants }
