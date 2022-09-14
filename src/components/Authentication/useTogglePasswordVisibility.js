import { useState } from 'react';

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [show, setShow] = useState('Hiện');

  const handlePasswordVisibility = () => {
    if (show === 'Hiện') {
      setShow('Ẩn');
      setPasswordVisibility(!passwordVisibility);
    } else if (show === 'Ẩn') {
      setShow('Hiện');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    show,
    handlePasswordVisibility,
  };
};
