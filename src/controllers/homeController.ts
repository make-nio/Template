import { Request, Response } from 'express';
import { loginMenuData, menuData } from '../services/frontend/feMenuServices';

export const index = (req: Request, res: Response) => {

    const isUserLoggedIn = req.cookies.isLoggedIn === 'true';

    const login: any = loginMenuData(isUserLoggedIn);
    const menu: any = menuData();

    res.render('index', { title: 'Inicio', titulo: 'Prueba de Titulo', login: login, menuitems: menu });
};

// Aquí puedes añadir más métodos para manejar diferentes rutas de frontend
