import axios from 'axios';

export const loginUser = (loginData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.post('http://localhost:8080/usuarios/login', loginData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => {
        console.log("Login exitoso:", response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.error("Error en login:", error);
        handleLoginError(error, reject);
      });
    }, 500);
  });
};

const handleLoginError = (error, reject) => {
  if (error.response) {
    if (error.response.status === 401) {
      reject(new Error('Credenciales incorrectas'));
    } else if (error.response.status === 403) {
      reject(new Error('No tiene permisos para acceder'));
    } else {
      reject(new Error(error.response.data.message || 'Error del servidor'));
    }
  } else if (error.request) {
    reject(new Error('No se pudo conectar con el servidor'));
  } else {
    reject(new Error(error.message));
  }
};