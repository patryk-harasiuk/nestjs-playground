import { FieldError } from 'react-hook-form';
import { FormControl, FormLabel, InputGroup, Box } from '@chakra-ui/react';

interface FieldWrapperProps {
  children: React.ReactNode;
  label?: string;
  error: FieldError | undefined;
}

export const FieldWrapper = ({ children, label, error }: FieldWrapperProps) => {
  return (
    <FormControl>
      <FormLabel>
        {label}
        <InputGroup>{children}</InputGroup>
      </FormLabel>
      {error?.message && <Box role="alert">{error.message}</Box>}
    </FormControl>
  );
};
