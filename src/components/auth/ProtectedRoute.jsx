import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const { user } = useAuthContext();
  
  // Si el usuario no está autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  // Si se especifican roles permitidos y el usuario no tiene el rol adecuado
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Si el usuario está autenticado y autorizado, mostrar el componente
  return element;
};