import { Request, Response } from 'express';
import { loginMenuData, menuData, getApiForDatatables } from '../services/frontend/feMenuServices';

//Manejo de renderizado del index.html
export const index = (req: Request, res: Response) => {
    //Creo la cookie de estar loggeado: 
    const isUserLoggedIn: boolean = req.cookies.isLoggedIn === 'true';
    const userName: string = req.cookies.nombre;
    const token: string = req.cookies.token;

    //Obtengo los datos de los 2 menus: 
    const login: any = loginMenuData(isUserLoggedIn, userName);
    const menu: any = menuData();

    //Renderizo index.html
    res.render('index', { title: 'Inicio', titulo: 'Titulo de Prueba', header: 'Dato de Header', login: login, menuitems: menu, token });
};

//Manejo de renderizado del login.html
export const login = (req: Request, res: Response) => {
    //Renderizo login.html
    res.render('login', { title: 'Login', titulo: 'Titulo de Prueba' });
};

// Método para manejar los datos de la tabla
export const getTableData = async (req: Request, res: Response) : Promise<any> => {
    //Creo la cookie del Token:
    const token: string = req.cookies.token;
    
    //Obtengo los datos de la api de dataTables:
    const datosTabla: any = await getApiForDatatables(token);

    // Renderizo la vista de la tabla con los datos
    res.render('generic/datatables', { title: 'DataTables', datosTabla: datosTabla });
};


//Manejo de renderizado del datamenu.html
export const datamenu = (req: Request, res: Response) => {
    //Creo la cookie de estar loggeado: 
    const isUserLoggedIn: boolean = req.cookies.isLoggedIn === 'true';
    const userName: string = req.cookies.nombre;
    const token: string = req.cookies.token;

    //Obtengo los datos de los 2 menus: 
    const login: any = loginMenuData(isUserLoggedIn, userName);
    const menu: any = menuData();

    //Renderizo index.html
    res.render('datamenu', { title: 'Menu de Datos', titulo: 'Menu de Datos', header: 'Por favor elija su menu', login: login, menuitems: menu, token });
};