import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import routePaths from './routePaths';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={routePaths.login} replace />;
  }

  return children;
}
