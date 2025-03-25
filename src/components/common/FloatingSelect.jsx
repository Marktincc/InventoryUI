import React from 'react';
import './FloatingSelect.css'; // Import the CSS file for the floating select ite

export const FloatingSelect = ({ 
  id, 
  label, 
  options, 
  value, 
  name, 
  onChange, 
  required = false, 
  disabled = false,
  placeholder = "Seleccione una opción" 
}) => {
  return (
    <div className="form-floating">
      <select
        className="border form-select outline-none "
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        aria-label={label}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};