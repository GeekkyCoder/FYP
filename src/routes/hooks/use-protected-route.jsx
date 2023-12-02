import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const useProtectedRoute = () => {
  const { user } = useAuth();

  const isAuthenticated = () => {
    if (user) return true;
    return false;
  };

  const ProtectedRoute = ({ element: Element, path }) => {
    // not working
    return isAuthenticated() ? Element : <Navigate to={'/login'} />;
  };

  return {
    ProtectedRoute,
  };
};

export default useProtectedRoute;
