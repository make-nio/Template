// src/helpers/showToast.ts
import toastr from 'toastr';
import { CustomError } from '../helpers/errorManager';

export const showToastError = (error: CustomError) => {
  toastr.error(error.message, 'Error');
  if (error.details) {
    console.error('Error Details:', error.details);
  }
};


export const showToast = (type: 'error' | 'success' | 'info' | 'warning', message: string, title: string = '', options: ToastrOptions = {}) => {
  // Configuración por defecto para Toastr
  const defaultOptions: ToastrOptions = {
    closeButton: true,
    progressBar: true,
    timeOut: 5000,
    extendedTimeOut: 5000,
    // Aquí puedes agregar más opciones por defecto si es necesario
  };

  // Combinar las opciones por defecto con las opciones proporcionadas
  const toastrOptions = { ...defaultOptions, ...options };

  // Mostrar el Toastr según el tipo
  switch (type) {
    case 'error':
      toastr.error(message, title, toastrOptions);
      break;
    case 'success':
      toastr.success(message, title, toastrOptions);
      break;
    case 'info':
      toastr.info(message, title, toastrOptions);
      break;
    case 'warning':
      toastr.warning(message, title, toastrOptions);
      break;
    default:
      toastr.info(message, title, toastrOptions);
  }
};
