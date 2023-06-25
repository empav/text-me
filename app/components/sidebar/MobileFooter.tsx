'use client';

import useRoutes from '@/app/hooks/useRoutes';
import MobileItem from './MobileItem';

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
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
