import {
  FC, PropsWithChildren, useEffect, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  mountInBody?: boolean;
}

export const Portal: FC<PropsWithChildren<PortalProps>> = (props) => {
  const {
    children,
    mountInBody,
  } = props;
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    ref.current = mountInBody ? document.body : document.querySelector<HTMLElement>('#portal');
    setMounted(true);
  }, [mountInBody]);
  // Type assertion needed due to @types/react version mismatch between react and react-dom
  return (mounted && ref.current) ? createPortal(children as Parameters<typeof createPortal>[0], ref.current) : null;
};
