import Image from 'next/image';
import AuthForm from './components/Authform';

const Auth = () => {
  return (
    <div
      className='
        p-4
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
      <AuthForm />
    </div>
  );
};

export default Auth;
