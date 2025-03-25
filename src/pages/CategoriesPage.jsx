
import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/common/DataTable';
import { FloatingInput } from '@/components/common/FloatingInput';
import { toast } from 'sonner';
import axios from 'axios';

export const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [currentCategory, setCurrentCategory] = useState({ id: '', name: '' });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add this function to fetch products by category
  const fetchProductsByCategory = async (categoryId) => {
    try {
      setLoadingProducts(true);
      const response = await axios.get(`http://localhost:8080/productos/categoria/${categoryId}`);
      console.log('Products for category:', response.data);
      setCategoryProducts(response.data);
      setLoadingProducts(false);
    } catch (err) {
      console.error('Error fetching products for category:', err);
      setCategoryProducts([]);
      setLoadingProducts(false);
    }
  };

  //CONVESION MONEDA
  let CoPesos = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumSignificantDigits: 3,
  });

  // Define columns for the products subtable
  const productColumns = [
    { field: 'id', header: 'ID', sortable: true },
    { field: 'nombre', header: 'Nombre', sortable: true },
    { field: 'categoriaNombre', header: 'Categoría', sortable: true },
    {
      field: 'valor',
      header: 'Precio',
      sortable: true,
      render: (item) => {
        // Check if valor exists and is a valid number
        const valor = item.valor;
        if (valor === undefined || valor === null || isNaN(Number(valor))) {
          return '$0.00';
        }
        return `${CoPesos.format(valor)}`;
      }
    }
  ];


  // Function to handle row click
  const handleRowClick = (category) => {
    console.log('Row clicked:', category);
    if (selectedCategory && selectedCategory.id === category.id) {
      // If clicking the same category, collapse it
      setSelectedCategory(null);
      setCategoryProducts([]);
    } else {
      // If clicking a different category, expand it
      setSelectedCategory(category);
      fetchProductsByCategory(category.id);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/categorias/getAll');
      // Transform data to match the expected format for DataTable
      const formattedCategories = response.data.map(category => ({
        id: category.id,
        name: category.name,
        // Adding default values for required fields in the table
        updatedDate: new Date().toLocaleDateString()
      }));
      setCategories(formattedCategories);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('No se pudieron cargar las categorías. Inténtalo de nuevo más tarde.');
      setLoading(false);
    }
  };

  // Definición de columnas - simplified to match actual data
  const columns = [
    {
      field: 'id',
      header: 'ID',
      sortable: true
    },
    {
      field: 'name',
      header: 'Nombre',
      sortable: true
    },
  ];

  // Función para manejar la edición
  const handleEdit = (item) => {
    setCurrentCategory(item);
    setModalMode('edit');
  };

  // Función para abrir el modal de añadir categoría
  const handleAddNew = () => {
    setCurrentCategory({ id: '', name: '' });
    setModalMode('add');
  };

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({
      ...currentCategory,
      [name]: value
    });
  };

  // Función para guardar la categoría (crear o actualizar)
  const handleSaveCategory = () => {
    const savePromise = async () => {
      if (modalMode === 'add') {
        // Crear nueva categoría
        const response = await axios.post('http://localhost:8080/categorias/create', {
          name: currentCategory.name
        });
        return { name: currentCategory.name, action: 'creada' };
      } else {
        // Actualizar categoría existente
        const response = await axios.patch(`http://localhost:8080/categorias/update/${currentCategory.id}`, {
          name: currentCategory.name
        });
        return { name: currentCategory.name, action: 'actualizada' };
      }
    };

    toast.promise(savePromise, {
      loading: 'Guardando categoría...',
      success: (data) => {
        // Actualizar la lista de categorías
        fetchCategories();
        return `Categoría ${data.name} ${data.action} exitosamente`;
      },
      error: 'Error al guardar la categoría',
    });

    // Cerrar el modal después de iniciar la operación
    document.querySelector('[data-bs-dismiss="modal"]').click();
  };

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Categorías</h2>
        <button
          className="btn btn-shark"
          data-bs-toggle="modal"
          data-bs-target="#categoryModal"
          onClick={handleAddNew}
        >
          <i className="bi bi-plus-lg me-1"></i> Nueva categoría
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
        <div>
          <DataTable
            data={categories}
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
            onRowClick={handleRowClick}
            selectedRow={selectedCategory ? selectedCategory.id : null}
          />

          {selectedCategory && (
            <div className="mt-4 mb-4">
              <h4>Productos en categoría: {selectedCategory.name}</h4>
              {loadingProducts ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-shark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : categoryProducts.length === 0 ? (
                <div className="alert alert-info">
                  No hay productos en esta categoría
                </div>
              ) : (
                <DataTable
                  data={categoryProducts}
                  columns={productColumns}
                  editButtonClass="btn-outline-shark btn-sm"
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <div className="modal fade" id="categoryModal" tabIndex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="categoryModalLabel">
                {modalMode === 'add' ? 'Añadir nueva categoría' : 'Editar categoría'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => e.preventDefault()}>
                {modalMode === 'edit' && (
                  <div className="mb-4">
                    <FloatingInput
                      id="categoryId"
                      label="ID"
                      type="text"
                      value={currentCategory.id}
                      disabled
                    />
                  </div>
                )}
                <div className="mb-4">
                  <FloatingInput
                    id="categoryName"
                    label="Nombre"
                    placeholder="Nombre de la categoría"
                    type="text"
                    name="name"
                    value={currentCategory.name}
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
                onClick={() => {
                  handleSaveCategory();
                  // Cerrar el modal después de guardar
                  document.querySelector('[data-bs-dismiss="modal"]').click();
                }}
              >
                {modalMode === 'add' ? 'Añadir' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};