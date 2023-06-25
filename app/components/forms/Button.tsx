'use client';

import { AriaButtonProps } from 'react-aria';
import { useButton } from 'react-aria';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useObjectRef } from '@react-aria/utils';
import clsx from 'clsx';

export interface ButtonProps extends AriaButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const buttonRef = useObjectRef(ref);
  const { buttonProps } = useButton(props, buttonRef);
  const { children, className, variant } = props;

  const defaultClassName = clsx(`flex 
    justify-center 
    rounded-md 
    px-4 
    py-3 
    w-full 
    text-sm 
    font-semibold 
    ${(!variant || variant === 'primary') && 'dark:bg-sky-500 hover:bg-sky-600'}
    ${variant === 'secondary' && 'dark:bg-white'}
    disabled:opacity-70 
    disabled:cursor-not-allowed  
    hover:scale-105
    focus-visible:outline-sky-600`);

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
