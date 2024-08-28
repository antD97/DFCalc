import { FC, forwardRef, AnchorHTMLAttributes } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

const anchorVariants = cva(
  'text-amber-500 hover:underline',
  {
    variants: {},
    defaultVariants: {}
  }
)

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof anchorVariants> { }

const A: FC<AnchorProps> = forwardRef<HTMLAnchorElement, AnchorProps>(({ className, href, children, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      href={String(href)}
      className={twMerge(anchorVariants({ className }))}
      {...props}
    >
      {children}
    </Link>
  )
})

export { A, anchorVariants }
