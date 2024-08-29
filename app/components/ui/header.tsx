import { FC, HTMLAttributes, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const headerVariants = cva(
  'text-8xl text-center',
  {
    variants: {},
    defaultVariants: {}
  }
)

interface HeaderProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headerVariants> {
  level: '1' | '2' | '3' | '4' | '5' | '6'
}

const H: FC<HeaderProps> = forwardRef<HTMLHeadingElement, HeaderProps>(({ level, className, ...props }, ref) => {
  switch (level) {
    case '1': return <h1 ref={ref} className={twMerge(headerVariants({ className }))} {...props} />
    case '2': return <h2 ref={ref} className={twMerge(headerVariants({ className }))} {...props} />
    case '3': return <h3 ref={ref} className={twMerge(headerVariants({ className }))} {...props} />
    case '4': return <h4 ref={ref} className={twMerge(headerVariants({ className }))} {...props} />
    case '5': return <h5 ref={ref} className={twMerge(headerVariants({ className }))} {...props} />
    case '6': return <h6 ref={ref} className={twMerge(headerVariants({ className }))} {...props} />
  }
})

export { H, headerVariants }
