'use client';

import { useEffect, useState } from 'react';

export const useUserName = () => {
  const [userName, setUserName] = useState('Cargando...');

  useEffect(() => {
    async function fetchRandomUser() {
      const response = await fetch('https://randomuser.me/api/?nat=es');
      const data = await response.json();
      const user = data.results[0];
      const fullName = `${user.name.first} ${user.name.last}`;
      setUserName(fullName);
    }
    fetchRandomUser();
  }, []);

  return userName ?? 'Juan Perez';
};
