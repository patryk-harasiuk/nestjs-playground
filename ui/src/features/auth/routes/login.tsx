import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/layout';
import { RegisterForm } from '../components/register-form';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Log in to your account" subtitle="Don\t have an account?" action="Sign up">
      <RegisterForm onSuccess={() => navigate('/app')} />
    </Layout>
  );
};
