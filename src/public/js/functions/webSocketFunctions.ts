//src/public/js/functions/webSocketFunctions.ts
import io from 'socket.io-client';
import { showToast } from '../../../helpers/showToast'; 
import callApi from '../../../helpers/callApi'

// Función para iniciar la conexión WebSocket con autenticación
export const startSocketConnection = (token: string) => {
    const socket = io({
        auth: {
        token // Envía el token para la autenticación
        }
    });

    socket.on('connect', () => {
        console.log('Conectado al WebSocket con éxito');
    });

    socket.on('connect_error', (err) => {
        console.error('Error al conectar al WebSocket:', err.message);
    });

    socket.on('disconnect', (reason) => {
        (async () => {
            if (reason === 'io server disconnect') {
                // El servidor forzó la desconexión
                console.error('Desconexión forzada por el servidor');
                showToast('error', 'Por favor vuelva a reconectarse!');
                
                // Llamo a la api que borra las cookies y luego refresco pantalla
                const response = await callApi('/api/clearCookies', {}, token);
                console.log('Cierre de sesión:', response.data);
                window.location.reload();

            } else {
                // La desconexión fue iniciada por el cliente o por otro motivo
                console.log('Desconectado del WebSocket:', reason);

                // Intento reconectarme
                socket.connect();
            }
        })();
    });

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

    socket.on('mensaje_personal', (data) => {
        try {
            const mensaje: any = JSON.parse(data);
            console.log('mensaje_personal: ', mensaje)
            const { type, message, title, options } = mensaje;
            console.log('mensaje_personal separado: ', type, message, title, options)
            showToast(type, message, title, options);
        } catch (error) {
            console.error('Error al parsear el mensaje de notificación:', error);
            // Manejar el error o mostrar un mensaje de error genérico
            showToast('error', 'Error al recibir la notificación.');
        }
    });

    socket.on('accion_personal', (data) => {
        (async () => {
            try {
                const accion: any = JSON.parse(data);
                console.log('accion_personal: ', accion);
                
                if (accion.action === 'logout') {
                    const token: string = accion?.data?.token;
    
                    // Aquí llamas a tu función asíncrona
                    const response = await callApi('/api/logout', {}, token); //CHAT: Aqui llamo a la funcion callApi para borrar las cookies...
                    console.log('Cierre de sesión:', response.data);
                    window.location.reload();
                }
    
            } catch (error) {
                console.error('Error al parsear el mensaje de notificación:', error);
                showToast('error', 'Error al recibir la notificación.');
            }
        })();
    });
    

    socket.on('accion_frontend', (accion) => {
        console.log('Acción recibida:', accion);
        // Aquí puedes agregar la lógica para manejar diferentes tipos de acciones  
    });

    return socket;
};

// Función para obtener el token del almacenamiento local o de un elemento oculto
export const getToken = () => {
    // Aquí puedes cambiarlo por tu lógica de cómo obtienes el token
    // Por ejemplo, del almacenamiento local o de un input oculto
    const tokenElement = document.querySelector('input[name="token"]') as HTMLInputElement;
    return tokenElement ? tokenElement.value : null;
};

