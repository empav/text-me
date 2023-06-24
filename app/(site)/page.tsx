import Image from 'next/image';
import AuthForm from './components/Authform';

const Auth = () => {
  return (
    <div
      className='
        flex 
        min-h-full 
        flex-col 
        justify-center 
        items-center
      '
    >
      <Image
        height='48'
        width='48'
        className='mx-auto w-[100px]'
        src='/images/logo.svg'
        alt='Logo Textme'
      />
      <h2
        className='
            mt-6 
            text-2xl 
            font-semibold 
            dark:text-white
          '
      >
        Sign in to your account
      </h2>
      <AuthForm />
    </div>
  );
};

export default Auth;
