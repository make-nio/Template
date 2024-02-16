// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const secret: string = process.env.ACCESS_TOKEN_SECRET || 'ex1gmMMOySfu3nGHOySfu3nGH';
    const authHeader: string | undefined = req.headers['authorization'];
    const token: string | undefined = authHeader && authHeader.split(' ')[1];

    if (!token) // Aquí simplificamos la comprobación a solo !token, que cubre null y undefined.
      return res.status(401).send('Token de autenticación no encontrado!!');

    jwt.verify(token, secret, (err: any, user: any) => {
      if (err) {
        return res.status(403).send('Token de autenticación incorrecto!!');
      }
      req.user = user;
      next();
    });
  } catch (error) {
    // Manejo del error inesperado
    console.error('Error inesperado en el middleware de autenticación', error);
    return res.status(500).send('Error interno del servidor');
  }
};

export const authenticateTokenWithoutExpiry = (req: Request, res: Response, next: NextFunction) => {
  try {
    const secret: string = process.env.ACCESS_TOKEN_SECRET || 'ex1gmMMOySfu3nGHOySfu3nGH';
    const authHeader: string | undefined = req.headers['authorization'];
    const token: string | undefined = authHeader && authHeader.split(' ')[1];

    if (!token) // Aquí simplificamos la comprobación a solo !token, que cubre null y undefined.
      return res.status(401).send('Token de autenticación no encontrado!!');

    jwt.verify(token, secret, { ignoreExpiration: true }, (err: any, user: any) => {
      if (err) {
        return res.status(403).send('Token de autenticación incorrecto!!');
      }
      req.user = user;
      next();
    });
  } catch (error) {
    // Manejo del error inesperado
    console.error('Error inesperado en el middleware de autenticación', error);
    return res.status(500).send('Error interno del servidor');
  }
};

export const validateAdminRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = req?.user;

    if (!user) // Chequeamos que exista user.
      return res.status(401).send('User no encontrado en request!!');

    if (!user?.rol) // Chequeamos que exista user.
      return res.status(401).send('Rol no encontrado!!');

    const rol: string = user?.rol;

    if (rol !== 'Admin')
      return res.status(401).send('Rol incorrecto!!');
    else
      next();

  } catch (error) {
    // Manejo del error inesperado
    console.error('Error inesperado en el middleware de autenticación', error);
    return res.status(500).send('Error interno del servidor');
  }
};