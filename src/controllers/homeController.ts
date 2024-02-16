import { Request, Response } from 'express';
import { loginMenuData, menuData } from '../services/frontend/feMenuServices';

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
    res.render('index', { title: 'Inicio', titulo: 'Prueba de Titulo', login: login, menuitems: menu, token });
};

//Manejo de renderizado del login.html
export const login = (req: Request, res: Response) => {
    //Renderizo login.html
    res.render('login', { title: 'Inicio', titulo: 'Prueba de Titulo' });
};

// Método para manejar los datos de la tabla
export const getTableData = (req: Request, res: Response) => {
    const datosTabla = {
        cabeceras: ['ID', 'Nombre', 'Fecha de Ingreso', 'Email', 'Ciudad'],
        valores: [
            [1, 'Alicia Fernandez', '2024-01-01', 'alicia@example.com', 'Madrid'],
            [2, 'Juan González', '2024-01-02', 'juan@example.com', 'Barcelona'],
            [3, 'Laura Martínez', '2024-01-03', 'laura@example.com', 'Sevilla'],
            [4, 'Carlos Hernández', '2024-01-04', 'carlos@example.com', 'Valencia'],
            [5, 'Sofía Gómez', '2024-01-05', 'sofia@example.com', 'Zaragoza'],
            [6, 'Lucas García', '2024-01-06', 'lucas@example.com', 'Málaga'],
            [7, 'Marta López', '2024-01-07', 'marta@example.com', 'Murcia'],
            [8, 'Antonio Jiménez', '2024-01-08', 'antonio@example.com', 'Palma'],
            [9, 'Carmen Ruiz', '2024-01-09', 'carmen@example.com', 'Las Palmas'],
            [10, 'Jose Ortiz', '2024-01-10', 'jose@example.com', 'Bilbao'],
            [11, 'Alicia Ortiz', '2024-01-01', 'alicia@example.com', 'Madrid'],
            [12, 'Juan Ruiz', '2024-01-02', 'juan@example.com', 'Barcelona'],
            [13, 'Laura López', '2024-01-03', 'laura@example.com', 'Sevilla'],
            [14, 'Carlos Gómez', '2024-01-04', 'carlos@example.com', 'Valencia'],
            [15, 'Sofía Martínez', '2024-01-05', 'sofia@example.com', 'Zaragoza'],
            [16, 'Lucas González', '2024-01-06', 'lucas@example.com', 'Málaga'],
            [17, 'Marta García', '2024-01-07', 'marta@example.com', 'Murcia'],
            [18, 'Antonio Fernandez', '2024-01-08', 'antonio@example.com', 'Palma'],
            [19, 'Sofía Ruiz', '2024-01-09', 'carmen@example.com', 'Las Palmas'],
            [20, 'Jose Hernández', '2024-01-10', 'jose@example.com', 'Bilbao']
        ]
    };

    //Creo la cookie de estar loggeado: 
    const isUserLoggedIn: boolean = req.cookies.isLoggedIn === 'true';
    const userName: string = req.cookies.nombre;
    const token: string = req.cookies.token;

    //Obtengo los datos de los 2 menus: 
    const login: any = loginMenuData(isUserLoggedIn, userName);
    const menu: any = menuData();

    // Renderizo la vista de la tabla con los datos
    res.render('generic/datatables', { datosTabla: datosTabla, login: login, menuitems: menu, token });
};
