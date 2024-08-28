import { FC, HTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const paragraphVariants = cva(
  'text-md pb-4 last:pb-0',
  {
    variants: {},
    defaultVariants: {}
  }
)

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> { }

const P: FC<ParagraphProps> = forwardRef<HTMLHeadingElement, ParagraphProps>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={twMerge(paragraphVariants({ className }))}
      {...props}
    >
      {children}
    </p>
  )
})

export { P, paragraphVariants }
