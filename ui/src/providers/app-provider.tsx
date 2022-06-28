import { ReactNode, Suspense } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import { queryClient } from '@/lib';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Router>{children}</Router>;
      </QueryClientProvider>
    </Suspense>
  );
};
