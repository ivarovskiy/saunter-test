import * as React from 'react';
import { useState } from 'react';
import store from '../../store/Store';
import { Coordinates } from '../../models/Map';
import { v4 as uuidv4 } from 'uuid';

interface FormValues {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  range: string;
  isFavorite: boolean;
}

export const useForm = (initialValues: FormValues, handleClose: () => void, range: string, marks: Coordinates[]) => {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSave = () => {
    const id = uuidv4();
    const isFavorite = false;
  
    store.addNewPath({
      ...values,
      id,
      isFavorite,
      range,
      markers: marks,
    });

    handleClose();
  };

  return {
    values,
    setValues,
    handleInputChange,
    handleSave
  };
};

export const Form = (props: any) => { // sorry about that
  return <form>{props.children}</form>;
};
