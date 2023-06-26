import { useOverlayTrigger } from 'react-aria';
import {
  OverlayTriggerProps,
  OverlayTriggerState,
} from '@react-stately/overlays';

import Modal from './Modal';
import { ReactElement, cloneElement } from 'react';

interface ModalTriggerProps extends OverlayTriggerProps {
  children: (state: OverlayTriggerState) => ReactElement;
  state: OverlayTriggerState;
  trigger: React.FC;
  className?: string;
}

const ModalTrigger = ({
  trigger: Trigger,
  state,
  children,
  ...props
}: ModalTriggerProps) => {
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state
  );

  return (
    <>
      <Trigger {...triggerProps} />
      {state.isOpen && (
        <Modal {...props} state={state}>
          {cloneElement(children(state), overlayProps)}
        </Modal>
      )}
    </>
  );
};

export default ModalTrigger;
