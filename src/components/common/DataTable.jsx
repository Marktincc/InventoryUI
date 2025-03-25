import React, { useState, useEffect } from 'react';
import { FloatingSelect } from './FloatingSelect';
import './DataTable.css';

export const DataTable = ({ 
  data, 
  columns, 
  onEdit, 
  itemsPerPageOptions = [10, 25, 50, 100],
  defaultItemsPerPage = 10,
  onRowClick,
  selectedRow
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [selectedItems, setSelectedItems] = useState([]);

  // Calcular índices para paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Manejar cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Manejar selección de items
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Manejar selección de todos los items
  const handleSelectAll = () => {
    if (selectedItems.length === currentItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentItems.map(item => item.id));
    }
  };

  return (
    <div className="data-table-container">
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="bg-dark text-white">
            <tr>
              <th>
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={selectedItems.length === currentItems.length && currentItems.length > 0}
                    onChange={handleSelectAll}
                  />
                </div>
              </th>
              {columns.map((column, index) => (
                <th key={index} className={column.className || ''}>
                  {column.header}
                  {column.sortable && (
                    <span className="ms-1">
                      <i className="bi bi-arrow-down-up text-muted small"></i>
                    </span>
                  )}
                </th>
              ))}
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {currentItems.map((item, index) => (
              <tr 
                key={index} 
                className={`${selectedItems.includes(item.id) ? 'table-active' : ''} ${selectedRow === item.id ? 'table-primary' : ''}`}
                onClick={() => onRowClick && onRowClick(item)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                <td onClick={(e) => e.stopPropagation()}>
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </div>
                </td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className={column.className || ''}>
                    {column.render ? column.render(item) : item[column.field]}
                    {column.field === 'status' && (
                      <span className={`status-indicator ${item.status ? 'status-active' : 'status-inactive'}`}></span>
                    )}
                  </td>
                ))}
                <td className="text-end" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="btn btn-sm btn-outline-shark" 
                    onClick={() => onEdit && onEdit(item)}
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="showing-entries">
          Mostrando del {indexOfFirstItem + 1} al {Math.min(indexOfLastItem, data.length)} de {data.length} resultados
        </div>
        
       
        <div className="d-flex align-items-center">
          <div style={{ width: "150px" }} className="me-3">
            <FloatingSelect
              id="pageSizeSelect"
              label="Filas por página"
              name="itemsPerPage"
              value={itemsPerPage.toString()}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing page size
              }}
              options={itemsPerPageOptions.map(size => ({
                value: size.toString(),
                label: `${size} filas`
              }))}
            />
          </div>
          
          {/* Pagination controls */}
          <nav aria-label="Page navigation example">
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link outline-none" 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
              </li>
              
              {[...Array(totalPages).keys()].map(number => (
                <li 
                  key={number + 1} 
                  className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}
                >
                  <button 
                    className={`page-link ${currentPage === number + 1 ? 'text-white' : ''} outline-none`}
                    onClick={() => handlePageChange(number + 1)}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
              
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                  className="page-link outline-none" 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};