'use client';

import { signOut } from 'next-auth/react';
import { SSRProvider } from 'react-aria';
import Button from '../components/forms/Button';

const UsersClient = () => {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <SSRProvider>
      <main>
        <h1>Users page</h1>
        <Button className='w-auto' onPress={handleSignOut}>
          Logout
        </Button>
      </main>
    </SSRProvider>
  );
};

export default UsersClient;
