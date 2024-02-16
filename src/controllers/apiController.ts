//src/controllers/apiController.ts
import { Request, Response } from 'express';
//import { CustomError } from '../helpers/errorManager';

export const apiDefault = async (req: Request, res: Response) : Promise<any> => {
    return res.status(200).json({ mensaje: 'Salida' });
};

