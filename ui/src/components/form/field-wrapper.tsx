import { FieldError } from 'react-hook-form';

interface FieldWrapperProps {
  children: React.ReactNode;
  label?: string;
  error: FieldError | undefined;
}

export const FieldWrapper = ({ children, label, error }: FieldWrapperProps) => {
  return (
    <div>
      <label>
        {label}
        <div>{children}</div>
      </label>
      {error?.message && <div role="alert">{error.message}</div>}
    </div>
  );
};
