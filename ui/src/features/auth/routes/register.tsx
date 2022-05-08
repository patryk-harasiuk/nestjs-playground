import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/layout';
import { RegisterForm } from '../components/register-form';

export const Register = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Create new account" subtitle="Already have an account?" action="Log in">
      <RegisterForm onSuccess={() => navigate('/app')} />
    </Layout>
  );
};
