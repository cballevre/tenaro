import { AppRouter } from '@/core/components/app-router';
import { AppProvider } from './core/components/app-provider';

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
