'use client';

import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes, forwardRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

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

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({ initiallyOpen = false, text, className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div ref={ref} className='flex flex-col' {...props} >
      <button
        onClick={() => { setIsOpen(!isOpen) }}
        className='flex justify-center items-center gap-x-4 text-lg text-center hover:text-amber-500'
      >
        {
          isOpen ? (<><IoIosArrowUp />{text}<IoIosArrowUp /></>)
            : (<><IoIosArrowDown />{text}<IoIosArrowDown /></>)
        }
      </button>
      {isOpen ? (<div className={twMerge(accordionVariants({}), className)}>{children}</div>) : null}
    </div>
  )
})

export { Accordion, accordionVariants };
