'use client';

import type { AriaButtonProps } from 'react-aria';
import { useButton } from 'react-aria';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends AriaButtonProps {
  className?: string;
}

const defaultClassName = `flex 
  justify-center 
  rounded-md 
  px-4 
  py-3 
  w-full 
  text-sm 
  font-semibold 
  bg-sky-500 
  disabled:opacity-70 
  disabled:cursor-not-allowed 
  hover:bg-sky-600 
  focus-visible:outline-sky-600`;

function Button(props: ButtonProps) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { children, className } = props;

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={
        className ? twMerge(defaultClassName, className) : defaultClassName
      }
    >
      {children}
    </button>
  );
}

export default Button;
