'use client';

import { cva, VariantProps } from "class-variance-authority";
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentProps } from "overlayscrollbars-react";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

const customScrollVariants = cva(
  '',
  {
    variants: {},
    defaultVariants: {}
  }
);

interface CustomScrollProps extends OverlayScrollbarsComponentProps, VariantProps<typeof customScrollVariants> { }

const CustomScroll: FC<CustomScrollProps> = ({ options, defer, className, ...props }) => (
  <OverlayScrollbarsComponent
    options={options ?? { scrollbars: { autoHide: 'move' } }}
    defer={defer ?? true}
    className={twMerge(customScrollVariants(), className)}
    {...props}
  />
);

export default CustomScroll;
