import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return <Router>{children}</Router>;
};
