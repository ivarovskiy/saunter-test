import { createContext } from 'react';
import { Coordinates } from '../../models/Map';

export interface ModalContextType {
  range: string;
  setRange: (value: string) => void;
  marks: Coordinates[];
  setMarks: (value: Coordinates[]) => void;
}

export const ModalContext = createContext<ModalContextType>({
  range: '',
  setRange: () => undefined,
  marks: [],
  setMarks: (value: Coordinates[]) => undefined,
});
