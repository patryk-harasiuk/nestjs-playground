import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/layout';
import { LoginForm } from '../components/login-form';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Log in to your account" subtitle="Don\t have an account?" action="Sign up">
      <LoginForm onSuccess={() => navigate('/app')} />
    </Layout>
  );
};
