//src/controllers/apiNotificacionesController.ts
import { Request, Response } from 'express';
import { wsSendMessageToUser, wsSendActionToUser } from '../services/backend/beRedisServices';
import { CustomError } from '../helpers/errorManager';
import { publishToQueue } from '../helpers/redisQueue';

//Notificaciones:
export const enviarNotificacion = async (req: Request, res: Response) => {
    try {
        const { type, message, title, options } = req.body;
        const notificacion: string = JSON.stringify({ type, message, title, options });
        publishToQueue('canal_notificaciones', notificacion);
        return res.status(200).json({ success: true, message: 'Notificación enviada.' });
    } catch (error) {
        const customError = CustomError.fromError(error);
        console.error('API Error:', customError);
        res.status(customError?.statusCode || 500).json(customError.toJSON());
    }
};

export const enviarNotificacionUsuario = async (req: Request, res: Response) => {
    try {
        const { user, type, message, title, options } = req.body;
        const notificacion: any = { type, message, title, options };
        const result: any = await wsSendMessageToUser(user, notificacion);
        if(!result.success)
            return res.status(404).json(result);
        else
            return res.status(200).json(result);
    } catch (error) {
        const customError = CustomError.fromError(error);
        console.error('API Error:', customError);
        res.status(customError?.statusCode || 500).json(customError.toJSON());
    }
};

export const ejecutarAccionUsuario = async (req: Request, res: Response) => {
    try {
        const { user, action, data} = req.body;
        const notificacion: any = { action, data };
        const result: any = await wsSendActionToUser(user, notificacion);
        if(!result.success)
            return res.status(404).json(result);
        else
            return res.status(200).json(result);
    } catch (error) {
        const customError = CustomError.fromError(error);
        console.error('API Error:', customError);
        res.status(customError?.statusCode || 500).json(customError.toJSON());
    }
};

export const ejecutarAccionFrontend = async (req: Request, res: Response) => {
    try {
        const { action, data } = req.body; // data puede incluir cualquier dato necesario para la acción
        const accion = JSON.stringify({ action, data });
        publishToQueue('canal_accion_frontend', accion);
        return res.status(200).json({ success: true, message: 'Acción enviada al frontend.' });
    } catch (error) {
        const customError = CustomError.fromError(error);
        console.error('API Error:', customError);
        res.status(customError?.statusCode || 500).json(customError.toJSON());
    }
};

export const comunicarConBackend = async (req: Request, res: Response) => {
    try {
        const { type, message } = req.body;
        const mensajeBackend = JSON.stringify({ type, message });
        publishToQueue('canal_comunicacion_backend', mensajeBackend);
        return res.status(200).json({ success: true, message: 'Mensaje enviado al canal de backend.' });
    } catch (error) {
        const customError = CustomError.fromError(error);
        console.error('API Error:', customError);
        res.status(customError?.statusCode || 500).json(customError.toJSON());
    }
};