import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RoleRedirect() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === 'student')   return <Navigate to="/student"   replace />;
  if (user.role === 'faculty')   return <Navigate to="/faculty"   replace />;
  if (user.role === 'committee') return <Navigate to="/committee" replace />;

  return <Navigate to="/" replace />;
}