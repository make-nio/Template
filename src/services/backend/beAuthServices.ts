//src/services/backend/beAuthServices
import { Response } from 'express';
import jwt from 'jsonwebtoken';

// Establecer cookie de autenticación
export const setAuthCookie = (res: Response, isLoggedIn: boolean, nombre: string, token: string): void => {
    res.cookie('isLoggedIn', isLoggedIn.toString(), { httpOnly: true, secure: true });
    res.cookie('nombre', nombre, { httpOnly: true, secure: true });
    res.cookie('token', token, { httpOnly: true, secure: true });
};

// Limpiar cookie de autenticación
export const clearAuthCookie = (res: Response): void => {
    res.clearCookie('isLoggedIn');
    res.clearCookie('nombre');
    res.clearCookie('token');
};

// Función para generar el token
export const generateToken = (user: any): any => {
    const secret: jwt.Secret = process.env.ACCESS_TOKEN_SECRET || 'ex1gmMMOySfu3nGHOySfu3nGH';
    return jwt.sign(user, secret, { expiresIn: '24h' });
};

