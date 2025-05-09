import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './routes';
import { ThemeProvider } from './theme';

export const App = () => {
  return (
    <ThemeProvider>
      <AppRoutes />

      <Toaster position="bottom-center" />
    </ThemeProvider>
  );
};
