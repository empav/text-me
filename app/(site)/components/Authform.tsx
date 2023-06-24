'use client';
import { SSRProvider } from 'react-aria';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { SubmitHandler, FieldValues, useForm } from 'react-hook-form';

import Button from '@/app/components/forms/Button';
import TextField from '@/app/components/forms/TextField';

type Variant = 'login' | 'register';

const Authform = () => {
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [variant, setVariant] = useState<Variant>('login');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('viaaaaa');
    try {
      setIsLoading(true);

      if (variant === 'register') await axios.post('/api/register', data);

      const signInResponse = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (signInResponse?.error) {
        toast.error('Invalid credentials!');
        throw new Error('Invalid credentials!');
      }

      if (signInResponse?.ok) {
        toast.success('Go to conversations');
        //TODO: router.push('/conversations');
      }
    } catch (error) {
      throw new Error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVariant = () => {
    setVariant((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  useEffect(() => {
    if (session.status === 'authenticated') {
      toast.success('go to /conversations');
      //TODO: router.push('/conversations');
    }
  }, [session.status]);

  return (
    <SSRProvider>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-[50vw] md:w-[30vw] max-w-sm flex flex-col items-center justify-center gap-2 mt-4'
      >
        <TextField
          isDisabled={isLoading}
          register={register}
          errors={errors}
          isRequired
          id='email'
          label='Email'
          type='email'
          placeholder='Email'
        />
        {variant === 'register' && (
          <TextField
            isDisabled={isLoading}
            register={register}
            errors={errors}
            isRequired
            id='name'
            label='Name'
            type='text'
            placeholder='Full name'
          />
        )}
        <TextField
          isDisabled={isLoading}
          register={register}
          errors={errors}
          isRequired
          id='password'
          label='Password'
          type='password'
          placeholder='Password'
        />
        <Button className='mt-4' type='submit'>
          {variant === 'login' ? 'Sign in' : 'Register'}
        </Button>
      </form>
      <p
        className='
            flex 
            gap-2 
            text-sm 
            mt-6  
            text-gray-500
          '
      >
        <span>
          {variant === 'login' ? 'New to Textme?' : 'Already have an account?'}
        </span>
        <span onClick={toggleVariant} className='underline cursor-pointer'>
          {variant === 'login' ? 'Create an account' : 'Login'}
        </span>
      </p>
    </SSRProvider>
  );
};

export default Authform;
