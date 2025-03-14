import React from 'react';
import { FloatingInput } from '@/components/common/FloatingInput';
import { Button } from '@/components/common/Button';
import '@/components/auth/auth.css'

export const LoginForm = ({ formData, isLoading, handleChange, handleLogin }) => {
  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    handleLogin();
  };

  return (
    <div className="w-75 mx-auto">
      <h4 className="mb-4 fw-bold">Sistema de Inventario</h4>
      
      <h5 className="mb-4">Por favor ingrese sus datos</h5>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <FloatingInput
            id="email-input"
            label="Correo electronico"
            placeholder="nombre@ejemplo.com"
            type="email"
            value={formData.correo}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-4">
          <FloatingInput
            id="password-input"
            label="Contraseña"
            placeholder="Contraseña"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="d-flex justify-content-end mt-1">
            <a href="#" className="text-decoration-none small">¿Olvidó su contraseña?</a>
          </div>
        </div>
        
        <Button 
          className="btn btn-shark w-100 py-2 mb-3"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
      </form>
      
      <div className="d-flex justify-content-center align-items-center gap-3 my-4">
        <hr className="flex-grow-1" />
        Inventarios
        <hr className="flex-grow-1" />
      </div>
      
    </div>
  );
};