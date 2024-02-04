import { Request, Response } from 'express';
import { loginMenuData, menuData } from '../services/frontend/feMenuServices';

//Manejo de renderizado del index.html
export const index = (req: Request, res: Response) => {
    //Creo la cookie de estar loggeado: 
    const isUserLoggedIn = req.cookies.isLoggedIn === 'true';

    //Obtengo los datos de los 2 menus: 
    const login: any = loginMenuData(isUserLoggedIn);
    const menu: any = menuData();

    //Renderizo index.html
    res.render('index', { title: 'Inicio', titulo: 'Prueba de Titulo', login: login, menuitems: menu });
};

//Manejo de renderizado del login.html
export const login = (req: Request, res: Response) => {
    //Renderizo login.html
    res.render('login', { title: 'Inicio', titulo: 'Prueba de Titulo' });
};

