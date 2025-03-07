import { Route, Routes, Outlet } from 'react-router-dom'
import { FloatingInput } from './components/FloatingInput';
import { Button } from './components/Button';
import { OffcanvasMenu } from './components/OffcanvasMenu';
import { Navbar } from './components/Navbar';

function Layout() {
  return (
    <>
      <Navbar />
      <OffcanvasMenu />
      <div className="container-fluid mt-3">
        <Outlet />
      </div>
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<h1 className='text-secondary'>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/count/*" element={<Layout />}>
          <Route index element={
            <Button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            />
          } />
          <Route path="increment" element={
            <FloatingInput
              id='floatingInput'
              label='email address'
              placeholder="name@example.com"
              type="email"
            />
          } />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  )
}


export default App
