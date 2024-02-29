
import axios from 'axios';

/**
 * Realiza una solicitud GET utilizando Axios y maneja las respuestas y errores.
 * @param {string} url La URL a la que se hace la solicitud.
 * @returns {Promise<any>} Promesa con los datos de la respuesta.
 */
export const fetchWithAxios = async (url: any) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    // Procesa y devuelve la respuesta directamente si es exitosa.
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      switch (statusCode) {
        case 401:
        case 403:
          setTimeout(() => {
            window.location.href = '/login';
          }, 500); // Retrasa la redirección 500 ms
          throw new Error('Redireccionando al login por falta de autenticación.');
        case 404:
          setTimeout(() => {
            window.location.href = '/';
          }, 500); // Retrasa la redirección 500 ms
          throw new Error('Redireccionando al inicio - Recurso no encontrado.');
        default:
          setTimeout(() => {
            window.location.href = '/error';
          }, 500); // Retrasa la redirección 500 ms
          throw new Error('Error en el servidor. Redireccionando a la página de error.');
      }
    } else {
      setTimeout(() => {
        window.location.href = '/error';
      }, 500); // Retrasa la redirección 500 ms
      throw new Error('Error al realizar la solicitud. Redireccionando a la página de error.');
    }
  }
};