import { FormLabel, InputGroup, Box } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface FieldWrapperProps {
  children: React.ReactNode;
  error: FieldError | undefined;
  label?: string;
}

export const FieldWrapper = ({ children, label, error }: FieldWrapperProps) => {
  return (
    <Box>
      <FormLabel>
        {label}
        <InputGroup>{children}</InputGroup>
      </FormLabel>
      {error && (
        <Box role="alert" color="tomato">
          {error?.message}
        </Box>
      )}
    </Box>
  );
};
