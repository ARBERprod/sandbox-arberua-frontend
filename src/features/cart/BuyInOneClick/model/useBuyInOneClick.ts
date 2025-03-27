import { useBuyInOneClickCartActions } from './buyInOneClickCartSlice';

export const useBuyInOneClick = () => {
  const { openCart, setCartItems } = useBuyInOneClickCartActions();

  return {
    setCartItems,
    openCart,
  };
};
