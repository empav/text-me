'use client';

import { SSRProvider } from 'react-aria';
import { BsGoogle } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';

import Button from '@/app/components/forms/Button';
import TextField from '@/app/components/forms/TextField';
import { useRouter } from 'next/navigation';

type Variant = 'login' | 'register';

const Authform = () => {
  const session = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [variant, setVariant] = useState<Variant>('login');

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleInput = (name: string) => (value: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleForm = (action: 'credentials' | 'google') => async (e: any) => {
    if (action === 'credentials') e.preventDefault();

    try {
      setIsLoading(true);

      if (variant === 'register') await axios.post('/api/register', formData);

      const payload = action === 'credentials' ? { ...formData } : {};

      const signInResponse = await signIn(action, {
        ...payload,
        redirect: false,
      });

      if (signInResponse?.error) {
        toast.error(
          variant === 'login' ? 'Invalid credentials!' : 'Something went wrong!'
        );
      }

      if (signInResponse?.ok) {
        // router.push('/users');
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

  const isFormValid = () => {
    if (variant === 'login') {
      return (
        emailRef.current &&
        passwordRef.current &&
        emailRef.current.validity.valid &&
        emailRef.current.value &&
        passwordRef.current.validity.valid &&
        passwordRef.current.value
      );
    } else {
      return (
        emailRef.current &&
        passwordRef.current &&
        nameRef.current &&
        emailRef.current.validity.valid &&
        emailRef.current.value &&
        passwordRef.current.validity.valid &&
        passwordRef.current.value &&
        nameRef.current.validity.valid &&
        nameRef.current.value
      );
    }
  };

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/users');
    }
  }, [router, session.status]);

  return (
    <SSRProvider>
      <form
        onSubmit={handleForm('credentials')}
        className='w-[100%] md:w-[30%] max-w-sm flex flex-col items-center justify-center gap-2 mt-4'
      >
        <h2
          className='
            mt-6 
            text-2xl 
            font-semibold 
            dark:text-white
          '
        >
          {variant === 'login'
            ? 'Sign in with your account'
            : 'Register a new account'}
        </h2>
        <TextField
          autoFocus
          ref={emailRef}
          isDisabled={isLoading}
          isRequired
          id='email'
          label='Email'
          type='email'
          value={formData.email}
          onChange={handleInput('email')}
        />
        {variant === 'register' && (
          <TextField
            ref={nameRef}
            isDisabled={isLoading}
            isRequired
            id='name'
            label='Name'
            type='text'
            onChange={handleInput('name')}
            value={formData.name}
          />
        )}
        <TextField
          ref={passwordRef}
          isDisabled={isLoading}
          isRequired
          id='password'
          label='Password'
          type='password'
          minLength={6}
          onChange={handleInput('password')}
          value={formData.password}
        />
        <Button className='mt-4' type='submit' isDisabled={!isFormValid()}>
          {variant === 'login' ? 'Sign in' : 'Register'}
        </Button>
        {variant === 'login' && (
          <Button onPress={handleForm('google')} variant='secondary'>
            <BsGoogle size={18} className='fill-sky-500' />
          </Button>
        )}
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
