'use client';

import { useMemo } from 'react';
import { IoClose, IoTrash } from 'react-icons/io5';
import { Conversation, User } from '@prisma/client';
import { format } from 'date-fns';

import useOtherUser from '@/app/hooks/useOtherUser';

import Avatar from '@/app/components/Avatar';
import AvatarGroup from '@/app/components/AvatarGroup';
import ModalTrigger from '@/app/components/modals/ModalTrigger';
import { OverlayTriggerState } from '@react-stately/overlays';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import useActiveList from '@/app/hooks/useActiveList';

interface ProfileDrawerProps {
  state: OverlayTriggerState;
  conversation: Conversation & {
    users: User[];
  };
  onDelete: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  state,
  conversation,
  onDelete,
}) => {
  //   const [confirmOpen, setConfirmOpen] = useState(false);
  const otherUser = useOtherUser(conversation);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), 'PP');
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return conversation.name || otherUser.name;
  }, [conversation.name, otherUser.name]);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? 'Active' : 'Offline';
  }, [conversation, isActive]);

  return (
    <>
      <ModalTrigger
        state={state}
        trigger={() => (
          <HiEllipsisHorizontal
            size={32}
            onClick={state.open}
            className='
          text-sky-500
          cursor-pointer
          hover:scale-110
          transition
        '
          />
        )}
      >
        {(state) => (
          <>
            <IoClose
              size={24}
              aria-hidden='true'
              onClick={state.close}
              className='text-sky-500 cursor-pointer hover:scale-110 self-end mb-8'
            />
            <div className='flex flex-col items-center'>
              <div className='mb-2'>
                {conversation.isGroup ? (
                  <AvatarGroup users={conversation.users} />
                ) : (
                  <Avatar user={otherUser} />
                )}
              </div>
              <div className='text-neutral-200'>{title}</div>
              <div className='mb-4 text-sm text-neutral-500'>{statusText}</div>
              <div
                className='w-10 h-10 mb-10 bg-white rounded-full flex items-center justify-center cursor-pointer'
                onClick={onDelete}
              >
                <IoTrash size={20} className='text-sky-500 hover:scale-110' />
              </div>
              <dl>
                {conversation.isGroup && (
                  <div className='mb-4'>
                    <dt
                      className='
                                  text-sm 
                                  font-medium 
                                  text-gray-200 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                '
                    >
                      Emails
                    </dt>
                    <dd
                      className='
                                  mt-1 
                                  text-sm 
                                  text-gray-500 
                                  sm:col-span-2
                                '
                    >
                      {conversation.users.map((user) => user.email).join(', ')}
                    </dd>
                  </div>
                )}
                {!conversation.isGroup && (
                  <div className='mb-4'>
                    <dt
                      className='
                                  text-sm 
                                  font-medium 
                                  text-gray-200 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                '
                    >
                      Email
                    </dt>
                    <dd
                      className='
                                  mt-1 
                                  text-sm 
                                  text-gray-500 
                                  sm:col-span-2
                                '
                    >
                      {otherUser.email}
                    </dd>
                  </div>
                )}
                {!conversation.isGroup && (
                  <div>
                    <dt
                      className='
                                    text-sm 
                                    font-medium 
                                    text-gray-200 
                                    sm:w-40 
                                    sm:flex-shrink-0
                                  '
                    >
                      Joined
                    </dt>
                    <dd
                      className='
                                    mt-1 
                                    text-sm 
                                    text-gray-500 
                                    sm:col-span-2
                                  '
                    >
                      <time dateTime={joinedDate}>{joinedDate}</time>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </>
        )}
      </ModalTrigger>
    </>
  );
};

export default ProfileDrawer;
