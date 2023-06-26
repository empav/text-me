import { useObjectRef } from '@react-aria/utils';
import { OverlayTriggerState } from '@react-stately/overlays';
import { forwardRef } from 'react';
import { AriaModalOverlayProps, Overlay, useModalOverlay } from 'react-aria';
import { twMerge } from 'tailwind-merge';

import { useClickOutside } from '@react-hooks-library/core';

interface ModalProps extends AriaModalOverlayProps {
  children: React.ReactNode;
  state: OverlayTriggerState;
  className?: string;
}

const underlayDefaultClassName = `
  fixed 
  top-0 
  left-0 
  right-0
  bottom-0
  w-full
  h-full
  z-50
  bg-black
  opacity-50
`;

const modalDefaultClassName = `
  fixed
  top-0
  right-0
  bottom-0
  left-0
  lg:top-[50%] 
  lg:left-[50%]
  lg:-translate-y-2/4
  lg:-translate-x-2/4
  p-4
  flex
  lg:w-[50vw]
  lg:h-[50vw]
  z-50
  bg-neutral-200
  rounded-md
`;

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, state, children, ...props }: ModalProps, ref) => {
    const modalRef = useObjectRef(ref);
    const { modalProps, underlayProps } = useModalOverlay(
      props,
      state,
      modalRef
    );

    useClickOutside(modalRef, () => {
      state.close();
    });

    return (
      <Overlay>
        <div className={underlayDefaultClassName} {...underlayProps}></div>
        <div
          {...modalProps}
          ref={modalRef}
          className={twMerge(modalDefaultClassName, className)}
        >
          {children}
        </div>
      </Overlay>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
