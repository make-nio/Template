import { handleEnterKeyPress, handleLoginClick, handleLogoutClick } from './functions/loginFunctions'

// Tipado explícito para los elementos del DOM
const loginButton: HTMLElement | null = document.getElementById('loginButton');
const logoutButton: HTMLElement | null = document.getElementById('logout');

const usuarioInput: HTMLInputElement | null = document.querySelector('input[name="username"]');
const contrasenaInput: HTMLInputElement | null = document.querySelector('input[name="password"]');

// Manejadores de eventos:

// Manejador de eventos para la tecla Enter en el campo de contraseña del login, si este existe
if (contrasenaInput) {
    contrasenaInput.addEventListener('keypress', (event: KeyboardEvent) => handleEnterKeyPress(loginButton, event));
}

//Manejador de eventos para el botón de login
loginButton?.addEventListener('click', (event) => handleLoginClick(usuarioInput, contrasenaInput, event));

//Manejador de eventos para el botón de logout
logoutButton?.addEventListener('click', handleLogoutClick);