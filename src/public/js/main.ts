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

// Configura las opciones de Toastr
toastr.options = {
    closeButton: true, // Muestra un botón de cierre en las notificaciones
    progressBar: true, // Muestra una barra de progreso en las notificaciones
};

console.log('¡JavaScript Iniciado!');

