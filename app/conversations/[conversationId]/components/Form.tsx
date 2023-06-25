'use client';

import axios from 'axios';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import TextField from '@/app/components/forms/TextField';
import useConversation from '@/app/hooks/useConversation';
import { useRef, useState } from 'react';
import Button from '@/app/components/forms/Button';

const Form = () => {
  const { conversationId } = useConversation();
  const [message, setMessage] = useState('');

  const messageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post('/api/messages', {
      message,
      conversationId: conversationId,
    });
    setMessage('');
    messageRef.current?.focus();
  };

  const handleChange = (message: string) => {
    setMessage(message);
  };

  const isFormValid = () => {
    return (
      messageRef.current &&
      messageRef.current.validity.valid &&
      messageRef.current.value
    );
  };

  return (
    <div
      className='
        py-4 
        px-4 
        dark:bg-black 
        border-t 
        border-gray-500
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      '
    >
      <HiPhoto size={36} className='text-sky-500 hover:scale-110' />
      <form
        onSubmit={handleSubmit}
        className='flex items-center gap-2 lg:gap-4 w-full'
      >
        <TextField
          ref={messageRef}
          id='message'
          isRequired
          label='Write a message'
          value={message}
          onChange={handleChange}
          autoFocus
        />
        <Button
          isDisabled={!isFormValid()}
          type='submit'
          className='
            rounded-full 
            p-2 
            w-auto
            bg-sky-500 
            cursor-pointer 
            hover:scale-110 
            transition
          '
        >
          <HiPaperAirplane size={24} className='text-white' />
        </Button>
      </form>
    </div>
  );
};

export default Form;
