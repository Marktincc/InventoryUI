import { useState, useEffect } from 'react';
import { DataTable } from '@/components/common/DataTable';
import { FloatingInput } from '@/components/common/FloatingInput';
import { FloatingSelect } from '@/components/common/FloatingSelect';
import { toast } from 'sonner';
import axios from 'axios';

export const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalModel, setModalModel] = useState('add');
  const [currentSupplier, setCurrentSupplier] = useState({ 
    id: '', 
    nombre: '', 
    nit: '', 
    direccion: '', 
    telefono: '', 
    correo: ''
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/proveedores/getAll');
      setSuppliers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      setError('No se pudieron cargar los proveedores. Inténtalo de nuevo más tarde.');
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
      field: 'nit',
      header: 'NIT',
      sorteable: true,
    },
    {
      field: 'direccion',
      header: 'Dirección',
      sorteable: true,
    },
    {
      field: 'telefono',
      header: 'Teléfono',
      sorteable: true,
    },
    {
      field: 'correo',
      header: 'Correo',
      sorteable: true,
    }
  ];

  const handleEdit = (item) => {
    setCurrentSupplier({
      id: item.id || '',
      nombre: item.nombre || '',
      nit: item.nit || '',
      direccion: item.direccion || '',
      telefono: item.telefono || '',
      correo: item.correo || ''
    });
    setModalModel('edit');
  };

  const handleAddNew = () => {
    setCurrentSupplier({ 
      id: '', 
      nombre: '', 
      nit: '', 
      direccion: '', 
      telefono: '', 
      correo: ''
    });
    setModalModel('add');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSupplier({ ...currentSupplier, [name]: value });
  };

  const handleSaveSupplier = () => {
    const savePromise = async () => {
      if (modalModel === 'add') {
        const response = await axios.post('http://localhost:8080/proveedores/create', currentSupplier);
        return 'Proveedor creado correctamente';
      } else {
        const response = await axios.patch(`http://localhost:8080/proveedores/update/${currentSupplier.id}`, currentSupplier);
        return 'Proveedor actualizado correctamente';
      }
    };

    toast.promise(savePromise, {
      loading: 'Guardando proveedor...',
      success: (data) => {
        fetchSuppliers();
        return data;
      },
      error: (err) => {
        console.error('Error saving supplier:', err);
        return 'Error al guardar el proveedor';
      },
    });

    // Cerrar el modal después de iniciar la operación
    document.querySelector('[data-bs-dismiss="modal"]').click();
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Proveedores</h2>
        <button
          className="btn btn-shark"
          data-bs-toggle="modal"
          data-bs-target="#supplierModal"
          onClick={handleAddNew}
        >
          <i className="bi bi-plus-lg me-1"></i> Nuevo proveedor
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
          data={suppliers}
          columns={columns}
          onEdit={(item) => {
            handleEdit(item);
            // Usar un pequeño retraso para asegurar que los datos se actualicen antes de abrir el modal
            setTimeout(() => {
              const modalButton = document.createElement('button');
              modalButton.setAttribute('data-bs-toggle', 'modal');
              modalButton.setAttribute('data-bs-target', '#supplierModal');
              document.body.appendChild(modalButton);
              modalButton.click();
              document.body.removeChild(modalButton);
            }, 0);
          }}
          editButtonClass="btn-outline-shark btn-sm"
        />
      )}
      <div className="modal fade" id="supplierModal" tabIndex="-1" aria-labelledby="supplierModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="supplierModalLabel">
                {modalModel === 'add' ? 'Nuevo proveedor' : 'Editar proveedor'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => e.preventDefault()}>
                {modalModel === 'edit' && (
                  <div className="mb-3">
                    <FloatingInput
                      id="supplierId"
                      label="ID"
                      type="text"
                      value={currentSupplier.id}
                      disabled
                    />
                  </div>
                )}
                <div className="mb-3">
                  <FloatingInput
                    id="supplierName"
                    label="Nombre"
                    placeholder="Nombre del proveedor"
                    type="text"
                    name="nombre"
                    value={currentSupplier.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <FloatingInput
                    id="supplierNit"
                    label="NIT"
                    placeholder="NIT del proveedor"
                    type="text"
                    name="nit"
                    value={currentSupplier.nit}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <FloatingInput
                    id="supplierAddress"
                    label="Dirección"
                    placeholder="Dirección del proveedor"
                    type="text"
                    name="direccion"
                    value={currentSupplier.direccion}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <FloatingInput
                    id="supplierPhone"
                    label="Teléfono"
                    placeholder="Teléfono del proveedor"
                    type="tel"
                    name="telefono"
                    value={currentSupplier.telefono}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <FloatingInput
                    id="supplierEmail"
                    label="Correo electrónico"
                    placeholder="Correo del proveedor"
                    type="email"
                    name="correo"
                    value={currentSupplier.correo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-shark" data-bs-dismiss="modal">Cancelar</button>
              <button
                type="button"
                className="btn btn-shark"
                onClick={handleSaveSupplier}
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