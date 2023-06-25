'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className='relative'>
      <div
        className='
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-12 
        w-12
        md:h-12 
        md:w-12
      '
      >
        <Image
          fill
          src={user?.image || '/images/placeholder.jpg'}
          alt='Avatar'
        />
      </div>
      <span
        className='
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          '
      />
    </div>
  );
};

export default Avatar;
