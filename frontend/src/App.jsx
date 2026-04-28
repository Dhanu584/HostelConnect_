import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
       <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}