import React, { useState, useEffect } from 'react';

export const CategoryModal = ({ mode, category, onSave, onClose }) => {
  const [currentCategory, setCurrentCategory] = useState({ id: '', name: '' });

  useEffect(() => {
    if (category) {
      setCurrentCategory(category);
    } else {
      setCurrentCategory({ id: '', name: '' });
    }
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({
      ...currentCategory,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(currentCategory);
  };

  return (
    <div className="modal fade" id="categoryModal" tabIndex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="categoryModalLabel">
              {mode === 'add' ? 'Añadir nueva categoría' : 'Editar categoría'}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {mode === 'edit' && (
                <div className="mb-3">
                  <label htmlFor="categoryId" className="form-label">ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryId"
                    value={currentCategory.id}
                    disabled
                  />
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  name="name"
                  value={currentCategory.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Cancelar</button>
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                {mode === 'add' ? 'Añadir' : 'Guardar cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};