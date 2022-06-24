import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

declare global {
  interface ImportMeta {
    env: {
      MODE: string;
      SNOWPACK_PUBLIC_API_MOCKING: string;
    };
  }
}

const container = document.getElementById('root');

const root = createRoot(container!);

root.render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>
);
