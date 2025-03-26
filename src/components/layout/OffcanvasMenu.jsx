import { NavLink, useNavigate } from 'react-router-dom';
import './OffcanvasMenu.css';
import { useAuthContext } from '@/context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect } from 'react';

export const OffcanvasMenu = () => {
  const { user } = useAuthContext();
  const userRole = user?.rol || 'guest';
  const navigate = useNavigate();

  // Import Bootstrap when component mounts
  useEffect(() => {
    // Ensure Bootstrap is available
    if (typeof window !== 'undefined' && typeof window.bootstrap === 'undefined') {
      import('bootstrap');
    }
  }, []);

  const handleNavLinkClick = (e, path) => {
    e.preventDefault(); // Prevent default navigation
    
    // Get the offcanvas element
    const offcanvasElement = document.getElementById('offcanvasExample');
    
    // Use data-bs-dismiss to trigger Bootstrap's built-in dismiss functionality
    const closeButton = document.querySelector('[data-bs-dismiss="offcanvas"]');
    if (closeButton) {
      closeButton.click();
    }
    
    // Add a small delay before navigation to allow the offcanvas to close
    setTimeout(() => {
      navigate(path);
    }, 300);
  }
  
  const commonMenuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'bi-speedometer2',
    },
    {
      label: 'Inventario',
      path: '/dashboard/inventory',
      icon: 'bi-box-seam',
    },
    {
      label: 'Reportes',
      path: '/dashboard/reports',
      icon: 'bi-bar-chart',
    },
  ]
  const adminMenuItems = [
    {
      label: 'Panel Admin',
      path: '/admin',
      icon: 'bi-gear',
    },
    {
      label: 'Categorías',
      path: '/admin/categories',
      icon: 'bi-tags',
    },
    {
      label: 'Usuarios',
      path: '/admin/users',
      icon: 'bi-people',
    },
    {
      label: 'Proveedores',
      path: '/admin/suppliers',
      icon: 'bi-shop',},
    {
      label: 'Configuración',
      path: '/admin/settings',
      icon: 'bi-sliders',
    },
  ];

  const menuItems = userRole === 'admin' ? [...commonMenuItems, ...adminMenuItems] : commonMenuItems;

  return (
    <div
      className="offcanvas offcanvas-start bg-dark"
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header text-white">
        <h5 className="offcanvas-title ms-2" id="offcanvasExampleLabel">Dashboard Menu</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <nav>
          <ul className="nav nav-pills nav-flush flex-column h-100">
            {/* Elementos comunes para todos los usuarios */}
            {menuItems.map((item,index) =>
              <li key={index} className='nav-item text-white'>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive? 'nav-link mb-1 text-white active ms-2' : "ms-2 nav-link mb-1 text-gray")}
                  onClick={(e) => handleNavLinkClick(e, item.path)}
                  end
                >
                  <div className='d-flex align-items-center'>
                    <i className={`${item.icon} me-2`}></i>
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              </li>
            )}
            <hr className="text-white mt-auto" />
          </ul>
        </nav>
      </div>
    </div>
  );
};