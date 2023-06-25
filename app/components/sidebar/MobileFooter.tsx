'use client';

import useRoutes from '@/app/hooks/useRoutes';
import Link from 'next/link';
import clsx from 'clsx';

const MobileFooter = () => {
  const routes = useRoutes();

  return (
    <div
      className='
        fixed 
        justify-between 
        w-full 
        bottom-0 
        z-40 
        flex 
        items-center 
        dark:bg-black 
        border-t-[1px]
        border-neutral-500 
        lg:hidden
      '
    >
      {routes.map(({ href, onClick, icon: Icon, active }) => (
        <Link
          key={href}
          onClick={onClick}
          href={href}
          className={clsx(
            `
          group 
          flex 
          gap-x-3 
          text-sm 
          leading-6 
          font-semibold 
          w-full 
          justify-center 
          p-4  
          hover:scale-110
        `,
            active ? 'text-sky-500' : 'text-gray-200'
          )}
        >
          <Icon className='h-6 w-6' />
        </Link>
      ))}
    </div>
  );
};

export default MobileFooter;
