import { Link } from 'react-router-dom';
import reactLogo from '@/assets/react.svg'

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <button
            className="btn border-0 d-flex align-items-center"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
          <h4 className="mb-0 ms-3 flex-grow-0 fw-bold">
            Sistemas inventarios
          </h4>
        </div>
        {/* Íconos de la derecha */}
        <div className="ms-auto d-flex align-items-center">
          <button className="btn btn-link text-dark me-3">
            <i className="bi bi-bell"></i>
          </button>
          
          {/* Dropdown del usuario */}
          <div className="dropdown">
            <button 
              className="btn btn-link p-0 border-0" 
              type="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <img
                src={reactLogo}
                alt="User avatar"
                className="rounded-circle text-danger"
                width="32"
                height="32"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><span className="dropdown-item-text">Usuario</span></li>
              <li><hr className="dropdown-divider"/></li>
              <li>
                <button className="dropdown-item text-danger" onClick={() => console.log('Cerrar sesión')}>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};