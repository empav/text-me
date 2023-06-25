'use client';

import { forwardRef } from 'react';
import type { AriaTextFieldProps } from 'react-aria';
import { useTextField } from 'react-aria';
import { useObjectRef } from '@react-aria/utils';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface TextFieldProps extends AriaTextFieldProps {
  className?: string;
}

const defaultClassName = `
            peer 
            w-full 
            p-4 
            font-light 
            dark:bg-black 
            autofill:bg-black 
            border-2 
            border-neutral-300 
            focus:border-white 
            rounded-md 
            outline-none 
            transition 
            disabled:opacity-70 
            disabled:cursor-not-allowed 
            invalid:border-rose-500 
            required:border-rose-500`;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const textFieldRef = useObjectRef(ref);
  const { labelProps, inputProps } = useTextField(props, textFieldRef);
  const { className } = props;

  return (
    <div className='flex flex-col w-[100%] relative'>
      <input
        {...inputProps}
        ref={textFieldRef}
        className={twMerge(defaultClassName, className)}
      />
      <label
        {...labelProps}
        className={clsx(`
          absolute 
          text-md
          duration-150 
          transform 
          ${inputProps.value && '-translate-y-4 scale-75'}
          top-4
          left-4 
          z-10 
          origin-[0] 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          peer-invalid:text-rose-500
          text-zinc-400
        `)}
      >
        {props.label}
      </label>
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;
