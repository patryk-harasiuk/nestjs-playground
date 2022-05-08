import { Routes, Route } from 'react-router-dom';

import { Login } from './login';
import { Register } from './register';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};
