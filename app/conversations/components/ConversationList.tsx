'use client';

import clsx from 'clsx';
import { User } from '@prisma/client';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { FullConversationType } from '@/app/types';
import useConversation from '@/app/hooks/useConversation';

import ConversationBox from './ConversationBox';

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        `
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
      `,
        isOpen ? 'hidden' : 'block w-full left-0'
      )}
    >
      <div className='flex justify-between p-3'>
        <div className='text-2xl font-bold text-neutral-500'>Messages</div>
        <div
          onClick={() => {}}
          className='
                rounded-full 
                p-2 
                text-sky-500 
                cursor-pointer 
                hover:opacity-75 
                transition
              '
        >
          <MdOutlineGroupAdd size={24} />
        </div>
      </div>
      {initialItems.map((item) => (
        <ConversationBox
          key={item.id}
          data={item}
          selected={conversationId === item.id}
        />
      ))}
    </aside>
  );
};

export default ConversationList;
