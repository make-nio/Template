import callApiServer from '../../helpers/callApiServer'

// Definiendo una interfaz para cada ítem del menú
interface MenuItem {
    nombre: string;
    icono?: string;
    id?: string;
    href: string;
}

 // Definiendo una interfaz para el objeto login completo
interface LoginData {
    nombre: string;
    items: MenuItem[];
}
  
export const loginMenuData = (isUserLoggedIn: boolean, nombre: string) : LoginData => {
    const loginLogged: LoginData = {
        nombre: nombre,
        items: [
                {
                    nombre:'Perfil',
                    icono:'fa-user', 
                    href:'#'
                },
                {
                    nombre:'Configuración', 
                    icono:'fa-cog', 
                    href:'#'
                },
                {
                    nombre:'Cerrar Sesión', 
                    icono:'fa-sign-out-alt', 
                    id:'logout',
                    href:'#'
                }
            ]
    };

    const loginPending: LoginData = {
        nombre: 'Anónimo',
        items: [
                {
                    nombre:'Registrarse', 
                    icono:'fa-cog', 
                    href:'#'
                },
                {
                    nombre:'Iniciar Sesión', 
                    icono:'fa-sign-in-alt', 
                    id:'login',
                    href:'/login'
                }
            ]
    };

    if (isUserLoggedIn) {
        return loginLogged;
    } else {
        return loginPending;
    }
};


export const menuData = (): MenuItem[] => {
    const menu: MenuItem[] = [
    {
        nombre:'Inicio', 
        icono:'fa-home', 
        href:'/'
    },
    {
        nombre:'DataMenu', 
        href:'/datamenu'
    },
    {
        nombre:'Item2', 
        href:'#'
    },
    {
        nombre:'Item3', 
        href:'#'
    },
    {
        nombre:'Item4', 
        href:'#'
    },
    {
        nombre:'Item5', 
        href:'#'
    },
];
    
    return menu;
};

export const getApiForDatatables = async (token: string) : Promise<any> => {

    
    const apiUrl: string | undefined = process.env.API_URL;

    const response: any = await callApiServer(`${apiUrl}/api/apiMockDefault`, {}, token);

    const datos: any[] = response.data;

    const cabeceras: string[] = datos.length > 0 ? Object.keys(datos[0]) : [];

    const datosTabla: any = {
        cabeceras: cabeceras,
        valores: datos
    };

    return datosTabla;
};

export const tabsData = (): MenuItem[] => {
    const menu: MenuItem[] = [
    {
        nombre:'Ruta1',
        id: 'is-active', 
        icono:'fa-home', 
        href:'ruta1'
    },
    {
        nombre:'Ruta2', 
        href:'ruta2'
    },
    {
        nombre:'Ruta3', 
        href:'ruta3'
    },
    {
        nombre:'Ruta4', 
        href:'ruta4'
    },
    {
        nombre:'Ruta5', 
        href:'ruta5 '
    },
];
    
    return menu;
};