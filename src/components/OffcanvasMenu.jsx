import { NavLink } from 'react-router-dom';
import './OffcanvasMenu.css'

export const OffcanvasMenu = () => {
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
        {/* Enlaces de navegación con NavLink */}
        <nav>
          <ul className="nav nav-pills nav-flush flex-column h-100">
            <li className='nav-item text-white'>
              <NavLink
                to="/count"
                end
                className={({ isActive }) => (isActive ? 'nav-link mb-1 text-white active ms-2' : "ms-2 nav-link mb-1 text-gray")}
                // data-bs-dismiss="offcanvas"
                onClick={handleNavLinkClick}
              >
                <p className='mb-0'>
                Dashboard
                </p>
              </NavLink>
            </li>
            <li className='nav-item text-white'>
              <NavLink
                to="/count/increment"
                className={({ isActive }) => (isActive ? 'nav-link mb-1 text-white active ms-2' : "ms-2 nav-link mb-1 text-gray")}
                data-bs="offcanvas"
                onClick={handleNavLinkClick}

              >
                Profile
              </NavLink>
            </li>
            <li className='nav-item text-white'>
              <NavLink
                to="/settings"
                className={({ isActive }) => (isActive ? 'nav-link mb-1 text-white active ms-2' : "ms-2 nav-link mb-1 text-gray")}
                // data-bs-dismiss="offcanvas"
                onClick={handleNavLinkClick}

              >
                Settings
              </NavLink>
            </li>
            
            <hr className="text-white mt-auto" />
          </ul>
        </nav>
      </div>
    </div>
  );
};