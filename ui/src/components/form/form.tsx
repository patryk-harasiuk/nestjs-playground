interface FormProps {
  children: React.ReactNode;
  onSubmit: () => void;
}

export const Form = ({ children, onSubmit }: FormProps) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};
