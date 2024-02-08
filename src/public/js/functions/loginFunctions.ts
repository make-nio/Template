import axios from 'axios';
import toastr from 'toastr';
import { CustomError } from '../../../helpers/errorManager';
import { showToastError } from '../../../helpers/showToast';

// Función para manejar la tecla Enter en el campo de contraseña
export const handleEnterKeyPress = async (loginButton: HTMLElement | null, event: KeyboardEvent): Promise<void> => {
    // Verifica si la tecla presionada es Enter y si el botón de inicio de sesión existe
    if (event.key === 'Enter' && loginButton) {
        event.preventDefault(); // Previene el comportamiento por defecto
        // Simula un clic en el botón de inicio de sesión
        loginButton.click();
    }
};

// Función para manejar el clic en el botón de login
export const handleLoginClick = async (usuarioInput: HTMLInputElement | null,contrasenaInput: HTMLInputElement | null,event: MouseEvent): Promise<void> => {
    event.preventDefault();
  
    if (!usuarioInput?.value || !contrasenaInput?.value) {
      toastr.error('Por favor, ingrese usuario y contraseña', 'Error');
      return;
    }
  
    try {
      const response = await axios.post('/api/login', {user: usuarioInput.value, password: contrasenaInput.value});
  
      console.log('Inicio de sesión:', response.data);
      window.location.href = '/';
      
    } catch (error: any) {
      const customError = CustomError.fromError(error);
      customError.logError();
      showToastError(customError);
    }
  };
  
  // Función para manejar el clic en el botón de logout
  export const handleLogoutClick = async (event: MouseEvent): Promise<void> => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/logout');
      console.log('Cierre de sesión:', response.data);
      window.location.reload();
    } catch (error: any) {
      const customError = CustomError.fromError(error);
      customError.logError();
      showToastError(customError);
    }
  };