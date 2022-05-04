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
  registration: OptionalRegistrationExceptName;
}

export const InputField = ({
  type = 'text',
  label,
  error,
  placeholder,
  registration,
}: InputFieldProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <Controller
        {...registration}
        render={({ field }) => <Input type={type} placeholder={placeholder} {...field} />}
      />
    </FieldWrapper>
  );
};
