import { FieldError, Controller, UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapper } from './field-wrapper';
import { Input } from '@chakra-ui/react';

interface OptionalRegistrationExceptName extends Partial<UseFormRegisterReturn> {
  name: string;
}

interface InputFieldProps {
  type?: 'text' | 'password' | 'email';
  label?: string;
  placeholder?: string;
  error: FieldError | undefined;
  htmlFor: string;
  registration: OptionalRegistrationExceptName;
}

export const InputField = ({
  type = 'text',
  label,
  error,
  placeholder,
  registration,
  htmlFor,
}: InputFieldProps) => {
  return (
    <FieldWrapper label={label} error={error} htmlFor={htmlFor}>
      <Controller
        {...registration}
        render={({ field }) => <Input type={type} placeholder={placeholder} {...field} />}
      />
    </FieldWrapper>
  );
};
