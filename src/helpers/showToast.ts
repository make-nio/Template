// src/helpers/showToast.ts
import toastr from 'toastr';
import { CustomError } from '../helpers/errorManager';

export const showToast = (error: CustomError) => {
  toastr.error(error.message, 'Error');
  if (error.details) {
    console.error('Error Details:', error.details);
  }
};