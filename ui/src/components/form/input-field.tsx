import { Input } from '@chakra-ui/react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper } from './field-wrapper';

interface InputFieldProps {
  type?: 'text' | 'password' | 'email';
  label?: string;
  placeholder?: string;
  registration?: UseFormRegisterReturn;
  error: FieldError | undefined;
}

export const InputField = ({ type = 'text', label, registration, error }: InputFieldProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <Input type={type} {...registration} />
    </FieldWrapper>
  );
};
