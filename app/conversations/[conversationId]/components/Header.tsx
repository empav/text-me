'use client';

import Link from 'next/link';
import { HiChevronLeft } from 'react-icons/hi';
import { Conversation, User } from '@prisma/client';

import useOtherUser from '@/app/hooks/useOtherUser';
import Avatar from '@/app/components/Avatar';
import useProfileDrawer from '@/app/hooks/useProfileDrawer';
import ProfileDrawer from './ProfileDrawer';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useActiveList from '@/app/hooks/useActiveList';
import { useMemo } from 'react';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const router = useRouter();
  const profileDrawerState = useProfileDrawer();

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline';
  }, [conversation, isActive]);

  const handleDelete = async () => {
    profileDrawerState.close();

    try {
      await axios.delete(`/api/conversations/${conversation.id}`);
      router.push('/conversations');
      toast.success('conversation deleted');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div
      className='
        dark:bg-black 
        w-full 
        flex 
        border-b-[1px] 
        border-gray-500
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      '
    >
      <div className='flex gap-3 items-center'>
        <Link
          href='/conversations'
          className='
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          '
        >
          <HiChevronLeft size={32} />
        </Link>

        <Avatar user={otherUser} />

        <div className='flex flex-col'>
          <div>{conversation.name || otherUser.name}</div>
          <div className='text-sm font-light text-neutral-500'>
            {statusText}
          </div>
        </div>
      </div>
      <ProfileDrawer
        state={profileDrawerState}
        conversation={conversation}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Header;
