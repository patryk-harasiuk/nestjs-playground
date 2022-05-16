import { Form, InputField } from '@/components/form';
import { Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface LoginFormInterface {
  onSuccess: () => void;
}

const schema = yup
  .object({
    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required').min(5).max(32),
  })
  .required();

export const LoginForm = ({ onSuccess }: LoginFormInterface) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => console.log(data);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        type="email"
        label="Email"
        registration={register('email')}
        error={errors.email}
      />

      <InputField
        type="password"
        label="Password"
        registration={register('password')}
        error={errors.password}
      />

      <Input type="submit" mt={8} />
    </Form>
  );
};
