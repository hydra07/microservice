import { ThemeProvider } from '@/components/theme-provider';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './configs/router.config';
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    </ThemeProvider>
  );
}

export default App;
