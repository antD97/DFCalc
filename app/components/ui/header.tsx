import { FC, HTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const headerVariants = cva(
  'text-center',
  {
    variants: {
      'variant': {
        'title': 'text-6xl md:text-8xl',
        'none': ''
      }
    },
    defaultVariants: {
      'variant': 'none'
    }
  }
)

interface HeaderProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headerVariants> {
  level: '1' | '2' | '3' | '4' | '5' | '6'
}

const H = forwardRef<HTMLHeadingElement, HeaderProps>(({ level, variant, className, ...props }, ref) => {
  const cn = twMerge(headerVariants({ variant, className }));

  switch (level) {
    case '1': return <h1 ref={ref} className={cn} {...props} />
    case '2': return <h2 ref={ref} className={cn} {...props} />
    case '3': return <h3 ref={ref} className={cn} {...props} />
    case '4': return <h4 ref={ref} className={cn} {...props} />
    case '5': return <h5 ref={ref} className={cn} {...props} />
    case '6': return <h6 ref={ref} className={cn} {...props} />
  }
})

export { H, headerVariants }
