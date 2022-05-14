import { FieldError } from 'react-hook-form';
import { FormControl, FormLabel, InputGroup, Box } from '@chakra-ui/react';

interface FieldWrapperProps {
  children: React.ReactNode;
  error: FieldError | undefined;
  htmlFor: string;
  label?: string;
}

export const FieldWrapper = ({ children, label, error, htmlFor }: FieldWrapperProps) => {
  return (
    <FormControl>
      <FormLabel htmlFor={htmlFor}>
        {label}
        <InputGroup>{children}</InputGroup>
      </FormLabel>
      {error?.message && <Box role="alert">{error.message}</Box>}
    </FormControl>
  );
};
