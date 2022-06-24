import { initMocks } from './mocks';
import { AppProvider } from './providers/app-provider';
import { AppRoutes } from './routes';

initMocks();

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
