'use client';

import { HTMLAttributes, FC, forwardRef, useState } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const accordionVariants = cva(
  'mt-4',
  {
    variants: {},
    defaultVariants: {}
  }
)

interface AccordionProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof accordionVariants> {
  initiallyOpen?: boolean;
  text: string;
}

const Accordion: FC<AccordionProps> = forwardRef<HTMLDivElement, AccordionProps>(({ initiallyOpen = false, text, className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div
      ref={ref}
      className='flex flex-col'
      {...props}
    >
      <button
        onClick={() => { setIsOpen(!isOpen) }}
        className='flex justify-center items-center gap-x-4 text-lg text-center'
      >
        {
          isOpen ? (
            <>
              <IoIosArrowUp />{text}<IoIosArrowUp />
            </>
          ) : (
            <>
              <IoIosArrowDown />{text}<IoIosArrowDown />
            </>
          )
        }
      </button>
      {
        isOpen ? (
          <div className={twMerge(accordionVariants({ className }))}>
            {children}
          </div>
        ) : null
      }

    </div>
  )
})

export { Accordion, accordionVariants }
