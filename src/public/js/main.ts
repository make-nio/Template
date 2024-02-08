// src/public/js/main.ts
import 'bulma/css/bulma.min.css';
import 'bulma-dark/src/cyborg.scss'; // Ajusta la ruta según la estructura de la carpeta de 'bulma-dark' en tu proyecto
import '../css/bulmaswatch.min.css'
import '../css/custom.scss';
import '../css/template/layout.scss';
import '../css/template/login.scss';
import './menu.ts';
import './login.ts';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import io from 'socket.io-client';
import { showToast } from '../../helpers/showToast'; 

// Configura las opciones de Toastr
toastr.options = {
    closeButton: true, // Muestra un botón de cierre en las notificaciones
    progressBar: true, // Muestra una barra de progreso en las notificaciones
};

const socket = io();

socket.on('notificacion', (data) => {
  try {
    const mensaje = JSON.parse(data);
    const { type, message, title, options } = mensaje;
    console.log('Notificacion: ', message)
    showToast(type, message, title, options);
  } catch (error) {
    console.error('Error al parsear el mensaje de notificación:', error);
    // Manejar el error o mostrar un mensaje de error genérico
    showToast('error', 'Error al recibir la notificación.');
  }
});

socket.on('accion_frontend', (accion) => {
  
  console.log('Acción recibida:', accion);
  // Aquí puedes agregar la lógica para manejar diferentes tipos de acciones


});

console.log('¡JavaScript Iniciado!');

