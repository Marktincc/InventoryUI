import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { CategoriesPage } from './pages/CategoriesPage';
import { UsersPage } from './pages/UsersPage';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" richColors closeButton />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<h1>No tienes permisos para acceder a esta página</h1>} />
        
        {/* Rutas protegidas para usuarios y administradores */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute 
            element={<Layout />} 
            allowedRoles={['admin', 'user']} 
          />
        }>
          <Route index element={<h1>Dashboard</h1>} />
          <Route path="inventory" element={<h1>Inventario</h1>} />
          <Route path="reports" element={<h1>Reportes</h1>} />
        </Route>
        
        {/* Rutas solo para administradores */}
        <Route path="/admin/*" element={
          <ProtectedRoute 
            element={<Layout />} 
            allowedRoles={['admin']} 
          />
        }>
          <Route index element={<h1>Panel de Administración</h1>} />
          <Route path="categories" element={<CategoriesPage/>} />
          <Route path="users" element={<UsersPage/>} />
          <Route path="settings" element={<h1>Configuración del Sistema</h1>} />
        </Route>
        
        {/* Ruta para capturar todas las demás */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
