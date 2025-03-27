import React, { useEffect, useState } from 'react';
import { Popup } from './Popup';

const popup_key = 'POPUP_KEY';

export const ReportPopup = () => {
  const [isPopupShowed, setIsPopupShowed] = useState(true);

  useEffect(() => {
    const popupState = sessionStorage.getItem(popup_key);
    setIsPopupShowed(popupState === 'true');
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(popup_key, 'true');
    setIsPopupShowed(true);
  };

  if (isPopupShowed) {
    return null;
  }

  return (
    <Popup isOpen onClose={handleClose} />
  );
};
