'use client';

import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useIsInTooltipTitle } from './tooltip';

const paragraphVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: 'text-md pb-4 last:pb-0',
        tooltip: 'text-sm pb-0 font-normal'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> { }

const P = forwardRef<HTMLHeadingElement, ParagraphProps>(({ variant, className, children, ...props }, ref) => {
  if (useIsInTooltipTitle() && !variant) { variant = 'tooltip'; }

  return (
    <p
      ref={ref}
      className={twMerge(paragraphVariants({ variant }), className)}
      {...props}
    >
      {children}
    </p>
  )
})

P.displayName = "Paragraph";

export { P, paragraphVariants };
