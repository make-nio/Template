
import { handleClick } from './functions/menuFunctions';

// Tipado explícito para los elementos del DOM
const body: HTMLBodyElement | null = document.querySelector('body');
const menuToggle: HTMLElement | null = document.getElementById('menu-toggle');
const sidebar: HTMLElement | null = document.getElementById('sidebar');


// Manejadores de eventos:

// Manejador de evetos del Menu: 
menuToggle?.addEventListener('click', (event: MouseEvent) => handleClick(body, sidebar, event));


