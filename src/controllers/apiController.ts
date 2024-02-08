import { Request, Response } from 'express';
import { setAuthCookie, clearAuthCookie } from '../services/backend/beMenuServices';
import { CustomError } from '../helpers/errorManager';
import { publishToQueue } from '../helpers/redisQueue';

export const apiDefault = async (req: Request, res: Response) : Promise<any> => {
    return res.status(200).json({ mensaje: 'Salida' });
};

// API para iniciar sesión
export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        // Aquí deberías añadir tu lógica de autenticación
        // Por ahora, usaremos datos mockeados
        const { user, password } = req.body;
        const nombreUsuario = 'Juan Perez'; // Este sería el nombre de usuario obtenido tras una autenticación exitosa

        if (user !== 'marianorsanchez@gmail.com' || password !== '0f6c4315') {
            // Lanza una instancia de CustomError para un error de negocio
            throw new CustomError('Usuario o contraseña incorrectos', 401);
        }

        setAuthCookie(res, true, nombreUsuario);

        // Devuelve una respuesta que coincide con la estructura de LoginResponse
        return res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            user: nombreUsuario,
        });
    } catch (error) {
        const customError = CustomError.fromError(error);
        console.error('API Error:', customError);
        res.status(customError.statusCode).json(customError.toJSON());
    }
};


// API para cerrar sesión
export const logout = async (req: Request, res: Response): Promise<any> => {
    clearAuthCookie(res);
    return res.status(200).json({ mensaje: 'Cierre de sesión exitoso' });
};


// API para enviar una notificación personalizada
export const enviarNotificacion = async (req: Request, res: Response) => {
    const { type, message, title, options } = req.body;
    const notificacion = JSON.stringify({ type, message, title, options });
    publishToQueue('canal_notificaciones', notificacion);
    return res.status(200).json({ success: true, message: 'Notificación enviada.' });
};

// API para ejecutar una acción personalizada en el frontend
export const ejecutarAccionFrontend = async (req: Request, res: Response) => {
    const { action, data } = req.body; // data puede incluir cualquier dato necesario para la acción
    const accion = JSON.stringify({ action, data });
    publishToQueue('canal_accion_frontend', accion);
    return res.status(200).json({ success: true, message: 'Acción enviada al frontend.' });
};

// API para comunicación entre backends
export const comunicarConBackend = async (req: Request, res: Response) => {
    const { type, message } = req.body;
    const mensajeBackend = JSON.stringify({ type, message });
    publishToQueue('canal_comunicacion_backend', mensajeBackend);
    return res.status(200).json({ success: true, message: 'Mensaje enviado al canal de backend.' });
};
