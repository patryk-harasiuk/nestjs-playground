import { FieldError } from 'react-hook-form';
import { FormLabel, InputGroup, Box } from '@chakra-ui/react';

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
