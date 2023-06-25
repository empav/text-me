'use client';

import type { AriaButtonProps } from 'react-aria';
import { useButton } from 'react-aria';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useObjectRef } from '@react-aria/utils';

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

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const buttonRef = useObjectRef(ref);
  const { buttonProps } = useButton(props, buttonRef);
  const { children, className } = props;

  return (
    <button
      {...buttonProps}
      ref={buttonRef}
      className={
        className ? twMerge(defaultClassName, className) : defaultClassName
      }
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
