import { useContext } from 'react';
import { HeaderMenuContext } from './HeaderMenuContext';

export const useHeaderMenu = () => useContext(HeaderMenuContext);
