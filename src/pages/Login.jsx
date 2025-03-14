import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import inventoryManagement from '@/assets/inventory-management.png'

export const Login = () => {
  const { formData, isLoading, handleChange, handleLogin } = useAuth();

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Panel de login (izquierda) - Improved styling */}
        <div className="col-md-5 bg-white d-flex align-items-center justify-content-center">
          <div className="login-container p-4 p-md-5" style={{
            maxWidth: '450px',
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
            background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)'
          }}>
            <LoginForm
              formData={formData}
              isLoading={isLoading}
              handleChange={handleChange}
              handleLogin={handleLogin}
            />
          </div>
        </div>

        <div className="col-md-7 d-flex align-items-center" style={{ backgroundColor: 'var(--color-shark-800)', overflow: 'hidden' }}>
          {/* Right side content remains unchanged */}
          <div className="position-relative w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="position-absolute w-100 h-100" style={{
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
              zIndex: 1
            }}></div>
            <img
              src={inventoryManagement}
              alt="Inventory Management"
              className="img-fluid position-relative"
              style={{
                maxHeight: '85%',
                objectFit: 'contain',
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease-in-out',
                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))',
                zIndex: 2
              }}
            />
            <div className="position-absolute bottom-0 start-50 translate-middle-x p-4 text-white text-center" style={{ zIndex: 3 }}>
              <div className="card bg-dark bg-opacity-75 p-4 text-white" style={{
                backdropFilter: 'blur(8px)',
                borderRadius: '15px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}>
                <h4 className="fw-bold mb-3">Gestione su inventario de forma eficiente</h4>
                <p className="mb-0 lead">Sistema integral para el control y seguimiento de sus productos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};