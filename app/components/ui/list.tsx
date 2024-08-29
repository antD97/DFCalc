import { FC, forwardRef, HTMLAttributes, OlHTMLAttributes } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const orderedListVariants = cva(
  'list-decimal flex flex-col gap-y-4 pb-4 last:pb-0',
  {
    variants: {},
    defaultVariants: {}
  }
)

interface OrderedListProps extends OlHTMLAttributes<HTMLOListElement>, VariantProps<typeof orderedListVariants> { }

const OL: FC<OrderedListProps> = forwardRef<HTMLOListElement, OrderedListProps>(({ className, children, ...props }, ref) => {
  return (
    <ol
      ref={ref}
      className={twMerge(orderedListVariants({ className }))}
      {...props}
    >
      {children}
    </ol>
  )
})

const unorderedListVariants = cva(
  'list-disc flex flex-col gap-y-4 pb-4 last:pb-0',
  {
    variants: {},
    defaultVariants: {}
  }
)

interface UnorderedListProps extends HTMLAttributes<HTMLUListElement>, VariantProps<typeof unorderedListVariants> { }

const UL: FC<UnorderedListProps> = forwardRef<HTMLUListElement, UnorderedListProps>(({ className, children, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={twMerge(unorderedListVariants({ className }))}
      {...props}
    >
      {children}
    </ul>
  )
})

const listItemVariants = cva(
  'ml-4',
  {
    variants: {},
    defaultVariants: {}
  }
)

interface ListItemProps extends HTMLAttributes<HTMLLIElement>, VariantProps<typeof listItemVariants> { }

const LI: FC<ListItemProps> = forwardRef<HTMLLIElement, ListItemProps>(({ className, children, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={twMerge(listItemVariants({ className }))}
      {...props}
    >
      {children}
    </li>
  )
})

export { OL, orderedListVariants, UL, unorderedListVariants, LI, listItemVariants }
