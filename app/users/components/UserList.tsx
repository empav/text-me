'use client';

import axios from 'axios';

import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Avatar from '@/app/components/Avatar';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const router = useRouter();
  const [, setIsLoading] = useState(false);

  const handleClick = (userId: string) => () => {
    setIsLoading(true);

    axios
      .post('/api/conversations', { userId })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <aside
      className='
        fixed 
        inset-y-0 
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        lg:border-r 
        lg:border-gray-500
        block w-full left-0
        px-4
        py-3
      '
    >
      <div
        className='
              text-2xl 
              font-bold 
              text-neutral-500 
              
              p-3
            '
      >
        People
      </div>
      {users.map((user) => (
        <div
          key={user.id}
          onClick={handleClick(user.id)}
          className='
            w-full 
            relative 
            flex 
            items-center 
            space-x-3 
            dark:bg-black 
            p-3 
            hover:bg-sky-500
            rounded-lg
            transition
            cursor-pointer
          '
        >
          <Avatar user={user} />
          <div className='min-w-0 flex-1'>
            <div className='focus:outline-none'>
              <span className='absolute inset-0' aria-hidden='true' />
              <div className='flex justify-between items-center mb-1'>
                <p className='text-sm font-medium text-neutral-200'>
                  {user.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default UserList;
