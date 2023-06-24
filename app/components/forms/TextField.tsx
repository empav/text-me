'use client';

import type { AriaTextFieldProps } from 'react-aria';
import { useTextField } from 'react-aria';
import { useRef } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export interface TextFieldProps extends AriaTextFieldProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextField = (props: TextFieldProps) => {
  const ref = useRef(null);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  const {
    label,
    id = `textField_${nanoid()}`,
    isRequired,
    register,
    errors,
    isDisabled,
  } = props;

  return (
    <div className='flex flex-col w-[100%]'>
      <label {...labelProps}>{label}</label>
      <input
        {...inputProps}
        {...register(id, { required: isRequired })}
        ref={ref}
        className={clsx(
          `p-2 text-gray-900`,
          errors[id] && 'focus:ring-rose-500',
          isDisabled && 'opacity-50 cursor-default'
        )}
      />
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
