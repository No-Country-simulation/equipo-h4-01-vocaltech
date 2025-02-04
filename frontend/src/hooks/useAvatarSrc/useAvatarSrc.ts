'use client';

import { useEffect, useState } from 'react';

export const useAvatarSrc = () => {
  const [avatarSrc, setAvatarSrc] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setAvatarSrc('https://i.pravatar.cc/150?');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return avatarSrc ?? '';
};
