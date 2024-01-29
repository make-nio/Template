import { Request, Response } from 'express';
import { setAuthCookie, clearAuthCookie } from '../services/backend/beMenuServices';

export const apiDefault = async (req: Request, res: Response) : Promise<any> => {
    return res.status(200).json({ mensaje: 'Salida' });
};

// API para iniciar sesión
export const login = async (req: Request, res: Response): Promise<any> => {
    // Aquí deberías añadir tu lógica de autenticación
    // Por ahora, usaremos datos mockeados
    const nombreUsuario = 'Juan Perez'; // Este sería el nombre de usuario obtenido tras una autenticación exitosa
    setAuthCookie(res, true, nombreUsuario);
    return res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
};

// API para cerrar sesión
export const logout = async (req: Request, res: Response): Promise<any> => {
    clearAuthCookie(res);
    return res.status(200).json({ mensaje: 'Cierre de sesión exitoso' });
};

// Aquí puedes añadir más métodos para manejar diferentes rutas de frontend
