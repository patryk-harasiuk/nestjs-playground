import { Form, InputField } from '@/components/form';

interface RegisterFormInterface {
  onSuccess: () => void;
}

export const RegisterForm = ({ onSuccess }: RegisterFormInterface) => {
  return (
    <div>
      <Form>
        {
          <>
            <InputField htmlFor="email" error={undefined} registration={{ name: 'login' }} />
          </>
        }
      </Form>
      ;
    </div>
  );
};
