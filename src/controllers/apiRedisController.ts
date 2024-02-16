//src/controllers/apiRedisController.ts
import { Request, Response } from 'express';
import { getAllUsersFromRedis, getUserDataFromRedis, deleteEntryFromRedis } from '../services/backend/beRedisServices';
import { CustomError } from '../helpers/errorManager';

//Redis:
export const obtenerTodosLosUsuarios = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await getAllUsersFromRedis();
        return res.status(200).json({ success: true, users });
    } catch (error) {
        const customError = CustomError.fromError(error);
        console.error('API Error:', customError);
        return res.status(customError?.statusCode || 500).json(customError.toJSON());
    }
};

export const obtenerDatosUsuario = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user } = req.body;
        const userData = await getUserDataFromRedis(user);
        if (!userData) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ success: true, userData });
    } catch (error) {
        const customError = CustomError.fromError(error);
        console.error('API Error:', customError);
        return res.status(customError?.statusCode || 500).json(customError.toJSON());
    }
};

export const borrarEntradaRedis = async (req: Request, res: Response): Promise<any> => {
    try {
        const { user } = req.body; 
        await deleteEntryFromRedis(user);
        return res.status(200).json({ success: true, message: 'Entrada eliminada correctamente' });
    } catch (error) {
        const customError = CustomError.fromError(error);
        console.error('API Error:', customError);
        return res.status(customError?.statusCode || 500).json(customError.toJSON());
    }
};
