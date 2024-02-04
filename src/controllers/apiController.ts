import { Request, Response } from 'express';
import { setAuthCookie, clearAuthCookie } from '../services/backend/beMenuServices';
import { CustomError } from '../helpers/errorManager';

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

