import {
  FC, ReactNode, useEffect, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  mountInBody?: boolean;
}

export const Portal: FC<PortalProps> = (props) => {
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
  return (mounted && ref.current) ? createPortal(children, ref.current) : null;
};
