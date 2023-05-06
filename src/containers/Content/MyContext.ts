import { createContext } from 'react';

export interface MyContextType {
    value: number;
    setValue: (value: number) => void;
  }
  
  export const MyContext = createContext<MyContextType>({
    value: -1,
    setValue: () => undefined,
  });
