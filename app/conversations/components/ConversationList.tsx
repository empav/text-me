'use client';

import clsx from 'clsx';
import { User } from '@prisma/client';
import { pusherClient } from '@/app/libs/pusher';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { find } from 'lodash';
import { FullConversationType } from '@/app/types';
import useConversation from '@/app/hooks/useConversation';

import ConversationBox from './ConversationBox';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  const [items, setItems] = useState(initialItems);
  const { conversationId, isOpen } = useConversation();

  const router = useRouter();
  const session = useSession();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
    };

    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:remove', removeHandler);
  }, [pusherKey, router]);

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
      {items.map((item) => (
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
