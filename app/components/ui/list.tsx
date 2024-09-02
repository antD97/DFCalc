'use client';

import { isInTooltipTitle } from '@/app/components/ui/tooltip'
import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, HTMLAttributes, OlHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const orderedListVariants = cva(
  'list-decimal flex flex-col last:pb-0',
  {
    variants: {
      variant: {
        default: 'gap-y-4 pb-4',
        tooltip: 'font-normal pb-2'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

interface OrderedListProps extends OlHTMLAttributes<HTMLOListElement>, VariantProps<typeof orderedListVariants> { }

const OL = forwardRef<HTMLOListElement, OrderedListProps>(({ variant, className, children, ...props }, ref) => {
  if (!variant && isInTooltipTitle()) { variant = 'tooltip'; }

  return (
    <ol
      ref={ref}
      className={twMerge(orderedListVariants({ variant }), className)}
      {...props}
    >
      {children}
    </ol>
  )
})

const unorderedListVariants = cva(
  'list-disc flex flex-col last:pb-0',
  {
    variants: {
      variant: {
        default: 'gap-y-4 pb-4',
        tooltip: 'font-normal pb-2'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

interface UnorderedListProps extends HTMLAttributes<HTMLUListElement>, VariantProps<typeof unorderedListVariants> { }

const UL = forwardRef<HTMLUListElement, UnorderedListProps>(({ variant, className, children, ...props }, ref) => {
  if (!variant && isInTooltipTitle()) { variant = 'tooltip'; }

  return (
    <ul
      ref={ref}
      className={twMerge(unorderedListVariants({ variant }), className)}
      {...props}
    >
      {children}
    </ul>
  )
})

export { OL, orderedListVariants, UL, unorderedListVariants }
