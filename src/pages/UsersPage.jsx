import { useState, useEffect } from 'react';
import { DataTable } from '@/components/common/DataTable';
import { FloatingInput } from '@/components/common/FloatingInput';
import { FloatingSelect } from '@/components/common/FloatingSelect';
import { toast } from 'sonner';
import axios from 'axios';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalModel, setModalModel] = useState('add');
  const [currentUser, setCurrentUser] = useState({ id: '', name: '', surnames: '', addres: '', email: '', phone: '', password: '', role: '', state: '' });

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/usuarios/getAll');
      
      const formattedUsers = response.data.map(user => {
        // Log individual user data to debug
        console.log('User estado value:', user.estado, typeof user.estado);
        
        // Convert boolean to string explicitly
        const estadoString = user.estado === true ? 'active' : 'inactive';
        console.log('Converted estado:', estadoString);
        
        return {
          id: user.id,
          nombre: user.nombre,
          apellidos: user.apellidos,
          direccion: user.direccion,
          correo: user.correo,
          telefono: user.telefono || '',
          rol: user.rol,
          estado: estadoString
        };
      });
      
      console.log('Formatted users with estado:', formattedUsers.map(u => u.estado));
      setUsers(formattedUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('No se pudieron cargar los usuarios. Inténtalo de nuevo más tarde.');
      setLoading(false);
    }
  };
  const columns = [
    {
      field: 'id',
      header: 'ID',
      sorteable: true,
    },
    {
      field: 'nombre',
      header: 'Nombre',
      sorteable: true,
    },
    {
      field: 'apellidos',
      header: 'Apellidos',
      sorteable: true,
    },
    {
      field: 'direccion',
      header: 'Dirección',
      sorteable: true,
    },
    {
      field: 'correo',
      header: 'Correo',
      sorteable: true,
    },
    {
      field: 'telefono',
      header: 'Teléfono',
      sorteable: true,
    },
    {
      field: 'rol',
      header: 'Rol',
      sorteable: true,
    },
    {
      field: 'estado',
      header: 'Estado',
      sorteable: true,
      render: (rowData) => {
        // We need to access the estado property from the row data
        const value = rowData.estado;
        console.log("Rendering estado value:", value, typeof value);
        return (
          <span className={`badge ${value === 'active' ? 'bg-success' : 'bg-danger'}`}>
            {value === 'active' ? 'Activo' : 'Inactivo'}
          </span>
        );
      },
    },
  ];

  const handleEdit = (item) => {
    // Map the fields from the data table format to the form format
    setCurrentUser({
      id: item.id || '',
      name: item.nombre || '',
      surnames: item.apellidos || '',
      addres: item.direccion || '',
      email: item.correo || '',
      phone: item.telefono || '',
      password: '',
      role: item.rol || '',
      state: item.estado || '',
      // Also include the original field names for the edit mode
      nombre: item.nombre || '',
      apellidos: item.apellidos || '',
      direccion: item.direccion || '',
      correo: item.correo || '',
      telefono: item.telefono || '',
      rol: item.rol || '',
      estado: item.estado || ''
    });
    setModalModel('edit');
  };

  const handleAddNew = () => {
    setCurrentUser({ id: '', name: '', surnames: '', addres: '', email: '', phone: '', password: '', role: '', state: '' });
    setModalModel('add');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  }

  const handleSaveUser = () => {
    const savePromise = async () => {
      if (modalModel === 'add') {
        const response = await axios.post('http://localhost:8080/usuarios/create', {
          nombre: currentUser.name,
          apellidos: currentUser.surnames,
          direccion: currentUser.addres,
          correo: currentUser.email,
          telefono: currentUser.phone,
          password: currentUser.password,
          rol: currentUser.role, // Asegúrate de que este valor sea "user" o "admin"
          estado: currentUser.state === 'active'
        });
        return 'Usuario creado correctamente';
      } else {
        // El backend usa un enum Rol con valores "admin" y "user"
        const updateData = {
          nombre: currentUser.nombre,
          apellidos: currentUser.apellidos,
          direccion: currentUser.direccion,
          correo: currentUser.correo,
          telefono: currentUser.telefono,
          rol: currentUser.rol, // Enviamos directamente el string del enum
          estado: currentUser.estado === 'active'
        };

        console.log('PATCH request data:', updateData);
        console.log('User ID:', currentUser.id);
        console.log('Role value:', updateData.rol);

        const response = await axios.patch(`http://localhost:8080/usuarios/update/${currentUser.id}`, updateData);
        return 'Usuario actualizado correctamente';
      }
    };

    toast.promise(savePromise, {
      loading: 'Guardando usuario...',
      success: (data) => {
        fetchUsers();
        return data;
      },
      error: (err) => {
        console.error('Error saving user:', err);
        return 'Error al guardar el usuario';
      },
    });

    // Cerrar el modal después de iniciar la operación
    document.querySelector('[data-bs-dismiss="modal"]').click();
  };
  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Usuarios</h2>
        <button
          className="btn btn-shark"
          data-bs-toggle="modal"
          data-bs-target="#categoryModal"
          onClick={handleAddNew}
        >
          <i className="bi bi-plus-lg me-1"></i> Nuevo usuario
        </button>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-shark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <DataTable
          data={users}
          columns={columns}
          onEdit={(item) => {
            handleEdit(item);
            // Usar un pequeño retraso para asegurar que los datos se actualicen antes de abrir el modal
            setTimeout(() => {
              const modalButton = document.createElement('button');
              modalButton.setAttribute('data-bs-toggle', 'modal');
              modalButton.setAttribute('data-bs-target', '#categoryModal');
              document.body.appendChild(modalButton);
              modalButton.click();
              document.body.removeChild(modalButton);
            }, 0);
          }}
          editButtonClass="btn-outline-shark btn-sm"
        />
      )}
      <div className="modal fade" id="categoryModal" tabIndex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="categoryModalLabel">
                {modalModel === 'add' ? 'Nuevo usuario' : 'Editar usuario'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => e.preventDefault()}>
                {modalModel === 'edit' && (
                  <div className="mb-3">
                    <FloatingInput
                      id="userId"
                      label="ID"
                      type="text"
                      value={currentUser.id}
                      disabled
                    />
                  </div>
                )}
                <div className="mb-3">
                  <FloatingInput
                    id="userName"
                    label="Nombre"
                    placeholder="Nombre del usuario"
                    type="text"
                    name="name"
                    value={currentUser.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <FloatingInput
                    id="userSurnames"
                    label="Apellidos"
                    placeholder="Apellidos del usuario"
                    type="text"
                    name="surnames"
                    value={currentUser.surnames}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <FloatingInput
                    id="userAddress"
                    label="Dirección"
                    placeholder="Dirección del usuario"
                    type="text"
                    name="addres"
                    value={currentUser.addres}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <FloatingInput
                    id="userEmail"
                    label="Correo electrónico"
                    placeholder="Correo del usuario"
                    type="email"
                    name="email"
                    value={currentUser.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <FloatingInput
                    id="userPhone"
                    label="Teléfono"
                    placeholder="Teléfono del usuario"
                    type="tel"
                    name="phone"
                    value={currentUser.phone}
                    onChange={handleInputChange}
                  />
                </div>
                {modalModel === 'add' && (
                  <div className="mb-3">
                    <FloatingInput
                      id="userPassword"
                      label="Contraseña"
                      placeholder="Contraseña del usuario"
                      type="password"
                      name="password"
                      value={currentUser.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}
                {modalModel === 'edit' ? (
                  <div className="mb-3">
                    <FloatingSelect
                      id="userRolEdit"
                      label="Rol"
                      name="rol"
                      value={currentUser.rol || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="Seleccionar rol"
                      options={[
                        { value: 'admin', label: 'Administrador' },
                        { value: 'user', label: 'Usuario' }
                      ]}
                    />
                  </div>
                ) : (
                  <div className="mb-3">
                    <FloatingSelect
                      id="userRolAdd"
                      label="Rol"
                      name="role"
                      value={currentUser.role || ''}
                      onChange={handleInputChange}
                      placeholder="Seleccionar rol"
                      required
                      options={[
                        { value: 'admin', label: 'Administrador' },
                        { value: 'user', label: 'Usuario' }
                      ]}
                    />
                  </div>
                )}

                {modalModel === 'edit' ? (
                  <div className="mb-3">
                    <FloatingSelect
                      id="userEstadoEdit"
                      label="Estado"
                      name="estado"
                      value={currentUser.estado || ''}
                      onChange={handleInputChange}
                      placeholder="Seleccionar estado"
                      required
                      options={[
                        { value: 'active', label: 'Activo' },
                        { value: 'inactive', label: 'Inactivo' }
                      ]}
                    />
                  </div>
                ) : (
                  <div className="mb-3">
                    <FloatingSelect
                      id="userEstadoAdd"
                      label="Estado"
                      name="state"
                      value={currentUser.state || ''}
                      onChange={handleInputChange}
                      placeholder="Seleccionar estado"
                      required
                      options={[
                        { value: 'active', label: 'Activo' },
                        { value: 'inactive', label: 'Inactivo' }
                      ]}
                    />
                  </div>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-shark" data-bs-dismiss="modal">Cancelar</button>
              <button
                type="button"
                className="btn btn-shark"
                onClick={handleSaveUser}
              >
                {modalModel === 'add' ? 'Añadir' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};