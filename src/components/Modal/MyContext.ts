import { createContext } from 'react';

export interface MyContextType {
  range: string;
  setRange: (value: string) => void;
}

export const MyContext = createContext<MyContextType>({
  range: '',
  setRange: () => undefined,
});
