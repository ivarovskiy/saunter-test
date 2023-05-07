import { createContext } from 'react';

export interface ContentContextType {
    value: string;
    setValue: (value: string) => void;
  }
  
  export const ContentContext = createContext<ContentContextType>({
    value: '',
    setValue: () => undefined,
  });
