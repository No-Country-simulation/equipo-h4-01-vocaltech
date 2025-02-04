import { createJSONStorage, StateStorage } from 'zustand/middleware';

const localStorageApi: StateStorage = {
  getItem: (name: string): string | Promise<string | null> | null => {
    const data = localStorage.getItem(name);
    return data;
  },
  setItem: (name: string, value: string): void => {
    localStorage.setItem(name, value);
  },
  removeItem: (name: string): void => {
    localStorage.removeItem(name);
    console.log('removeItem', name);
  }
};
export const customLocalStorage = createJSONStorage(() => localStorageApi);
