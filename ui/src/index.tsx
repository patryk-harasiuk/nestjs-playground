import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';

const container = document.getElementById('root');

if (!container) throw new Error('Failed to find the root element');

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
