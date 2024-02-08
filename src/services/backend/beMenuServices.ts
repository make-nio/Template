import { Response } from 'express';

// Establecer cookie de autenticación
export const setAuthCookie = (res: Response, isLoggedIn: boolean, nombre: string) => {
    res.cookie('isLoggedIn', isLoggedIn.toString(), { httpOnly: true, secure: true });
    res.cookie('nombre', nombre, { httpOnly: true, secure: true });
};

// Limpiar cookie de autenticación
export const clearAuthCookie = (res: Response) => {
    res.clearCookie('isLoggedIn');
    res.clearCookie('nombre');
};