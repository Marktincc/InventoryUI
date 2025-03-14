import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { OffcanvasMenu } from './OffcanvasMenu';

export const Layout = () => {
  return (
    <>
      <Navbar />
      <OffcanvasMenu />
      <div className="container-fluid mt-3">
        <Outlet />
      </div>
    </>
  );
};