//src/controllers/apiLoginController.ts
import { Request, Response } from 'express';
import { setAuthCookie, clearAuthCookie, generateToken } from '../services/backend/beAuthServices';
import { saveOnRedis, clearOnRedis } from '../services/backend/beRedisServices';
import { CustomError } from '../helpers/errorManager';

//Login:
export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        // Aquí deberías añadir tu lógica de autenticación
        // Por ahora, usaremos datos mockeados
        const { user, password } = req.body;
        const nombreUsuario = 'Mariano Sanchez'; // Este sería el nombre de usuario obtenido tras una autenticación exitosa

        if (user !== 'marianorsanchez@gmail.com' || password !== '0f6c4315') {
            // Lanza una instancia de CustomError para un error de negocio
            throw new CustomError('Usuario o contraseña incorrectos', 401);
        }

        // Crear un objeto de usuario con los datos hardcodeados, incluyendo el rol
        const userData = {
            nombre: nombreUsuario,
            user,
            rol: 'Admin'
        };

        // Generar el token JWT
        const token = generateToken(userData);
        
        // Genero la cookie de autenticación
        setAuthCookie(res, true, nombreUsuario, token);

        //Funcion para guardar los datos del usuario en la BBDD Redis con verificacion:
        await saveOnRedis(userData, token, null)


        // Devuelve una respuesta con la estructura deseada
        return res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            user: nombreUsuario,
            token: token // Opcional: devolver el token en la respuesta
        });
    } catch (error) {
        const customError = CustomError.fromError(error);
        console.error('API Error:', customError);
        res.status(customError?.statusCode || 500).json(customError.toJSON());
    }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
    try {

        const authHeader: string | undefined = req.headers['authorization'];
        const authData: string = authHeader === undefined ? ' ' : authHeader;
        const token: string = authData && authData.split(' ')[1];

        //Borro al usuario de redis:
        await clearOnRedis(req, token);
        //Borro las cookies:
        clearAuthCookie(res);
        
        return res.status(200).json({ mensaje: 'Cierre de sesión exitoso' });
    } catch (error) {
        const customError = CustomError.fromError(error);
        console.error('API Error:', customError);
        res.status(customError?.statusCode || 500).json(customError.toJSON());
    }
};

export const onlyClearCookies = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const authHeader: string | undefined = req.headers['authorization'];
        const authData: string = authHeader === undefined ? ' ' : authHeader;
        const token: string = authData && authData.split(' ')[1];

        //Borro al usuario de redis:
        await clearOnRedis(req, token);
        //Borro las cookies:
        clearAuthCookie(res);
        
        return res.status(200).json({ mensaje: 'Borrado de cookies exitoso' });
    } catch (error) {
        const customError = CustomError.fromError(error);
        console.error('API Error:', customError);
        res.status(customError?.statusCode || 500).json(customError.toJSON());
    }
};