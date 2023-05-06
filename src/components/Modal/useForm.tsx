import * as React from 'react';
import { useEffect, useState } from 'react';
import store from '../../store/Store';

interface FormValues {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  range: string;
  isFavorite: boolean;
}

export const useForm = (initialValues: FormValues, handleClose: () => void, range: string) => {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSave = () => {
    const id = store.paths.length;
    const isFavorite = false;
  
    store.addNewPath({
      ...values,
      id,
      isFavorite,
      range
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

export const Form = (props: any) => {
  return <form>{props.children}</form>;
};
