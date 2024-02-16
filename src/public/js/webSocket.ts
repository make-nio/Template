//src/public/js/webSocket.js
import {startSocketConnection, getToken} from './functions/webSocketFunctions'
   
// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    const token = getToken(); // Obtento el token del input hidden.

    if (token) {
        startSocketConnection(token);
    } else {
        console.log('No hay token disponible. El usuario debe iniciar sesión.');
    }
});