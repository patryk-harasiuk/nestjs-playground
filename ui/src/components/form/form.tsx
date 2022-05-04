import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormProps {
  children: React.ReactNode;
}

export const Form = ({ children }: FormProps) => {
  const { handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};
