'use client';

import clsx from 'clsx';
import EmptyState from '../components/EmptyState';

const Conversation = () => {
  return (
    <div className={clsx('lg:pl-80 h-full lg:block')}>
      <EmptyState />
    </div>
  );
};

export default Conversation;
