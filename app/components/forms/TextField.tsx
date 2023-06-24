'use client';

import type { AriaTextFieldProps } from 'react-aria';
import { useTextField } from 'react-aria';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

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

const TextField = (props: TextFieldProps) => {
  const ref = useRef(null);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  const { className } = props;

  return (
    <div className='flex flex-col w-[100%] relative'>
      <input
        {...inputProps}
        ref={ref}
        className={twMerge(defaultClassName, className)}
      />
      <label
        {...labelProps}
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-4 
          top-4
          left-4 
          z-10 
          origin-[0] 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${props.errorMessage ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {props.label}
      </label>
      {props.description && (
        <div {...descriptionProps}>{props.description}</div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} className='ring-rose-500'>
          {props.errorMessage}
        </div>
      )}
    </div>
  );
};

export default TextField;
