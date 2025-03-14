import { useState } from 'react';
import { toast } from 'sonner';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id === 'email-input' ? 'correo' : 'password']: value
    });
  };

  const validateForm = () => {
    if (!formData.correo || !formData.password) {
      toast.error('Por favor ingrese correo y contraseña');
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const loginPromise = loginUser(formData)
      .then(data => {
        // Guardar datos del usuario en el contexto
        login(data);
        
        // Redirigir según el rol
        if (data.rol === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
        
        return data;
      })
      .finally(() => setIsLoading(false));
    
    toast.promise(loginPromise, {
      loading: 'Iniciando sesión...',
      success: (data) => `Bienvenido, rol: ${data.rol}`,
      error: (err) => `Error: ${err.message}`,
      duration: 5000
    });
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleLogin
  };
};