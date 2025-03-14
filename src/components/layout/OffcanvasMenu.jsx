import { NavLink } from 'react-router-dom';
import './OffcanvasMenu.css';
import { useAuthContext } from '@/context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const OffcanvasMenu = () => {
  const { user } = useAuthContext();
  const userRole = user?.rol || 'guest';

  const handleNavLinkClick = () =>{
    const offcanvas = document.getElementById('offcanvasExample');
    const backdrop = document.querySelector('.offcanvas-backdrop'); // Asegúrate de que esta clase exista

    // Eliminar la clase 'show' del offcanvas
    offcanvas.classList.remove('show');

    // Si hay un fondo, también lo eliminamos
    if (backdrop) {
        backdrop.classList.remove('show');
        backdrop.remove(); // Eliminar el fondo del DOM si es necesario
    }
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
      label: 'Usuarios',
      path: '/admin/users',
      icon: 'bi-people',
    },
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
                  onClick={handleNavLinkClick}
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