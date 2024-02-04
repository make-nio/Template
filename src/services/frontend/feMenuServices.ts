
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
  
export const loginMenuData = (isUserLoggedIn: boolean) : LoginData => {
    const loginLogged: LoginData = {
        nombre: 'Juan Perez',
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
        nombre:'Item1', 
        href:'#'
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