//src/controllers/apiController.ts
import { Request, Response } from 'express';
//import { CustomError } from '../helpers/errorManager';

export const apiDefault = async (req: Request, res: Response) : Promise<any> => {
    return res.status(200).json({ mensaje: 'Salida' });
};


export const apiMockDefault = async (req: Request, res: Response) : Promise<any> => {
    const datos: any[] = [
        { id: 1, nombre: 'Alicia Fernandez', fechaIngreso: '2024-01-01', email: 'alicia@example.com', ciudad: 'Madrid' },
        { id: 2, nombre: 'Juan González', fechaIngreso: '2024-01-02', email: 'juan@example.com', ciudad: 'Barcelona' },
        { id: 3, nombre: 'Laura Martínez', fechaIngreso: '2024-01-03', email: 'laura@example.com', ciudad: 'Sevilla' },
        { id: 4, nombre: 'Carlos Hernández', fechaIngreso: '2024-01-04', email: 'carlos@example.com', ciudad: 'Valencia' },
        { id: 5, nombre: 'Sofía Gómez', fechaIngreso: '2024-01-05', email: 'sofia@example.com', ciudad: 'Zaragoza' },
        { id: 6, nombre: 'Lucas García', fechaIngreso: '2024-01-06', email: 'lucas@example.com', ciudad: 'Málaga' },
        { id: 7, nombre: 'Marta López', fechaIngreso: '2024-01-07', email: 'marta@example.com', ciudad: 'Murcia' },
        { id: 8, nombre: 'Antonio Jiménez', fechaIngreso: '2024-01-08', email: 'antonio@example.com', ciudad: 'Palma' },
        { id: 9, nombre: 'Carmen Ruiz', fechaIngreso: '2024-01-09', email: 'carmen@example.com', ciudad: 'Las Palmas' },
        { id: 10, nombre: 'Jose Ortiz', fechaIngreso: '2024-01-10', email: 'jose@example.com', ciudad: 'Bilbao' },
        { id: 11, nombre: 'Alicia Ortiz', fechaIngreso: '2024-01-11', email: 'alicia11@example.com', ciudad: 'Madrid' },
        { id: 12, nombre: 'Juan Ruiz', fechaIngreso: '2024-01-12', email: 'juan12@example.com', ciudad: 'Barcelona' },
        { id: 13, nombre: 'Laura López', fechaIngreso: '2024-01-13', email: 'laura13@example.com', ciudad: 'Sevilla' },
        { id: 14, nombre: 'Carlos Gómez', fechaIngreso: '2024-01-14', email: 'carlos14@example.com', ciudad: 'Valencia' },
        { id: 15, nombre: 'Sofía Martínez', fechaIngreso: '2024-01-15', email: 'sofia15@example.com', ciudad: 'Zaragoza' },
        { id: 16, nombre: 'Lucas González', fechaIngreso: '2024-01-16', email: 'lucas16@example.com', ciudad: 'Málaga' },
        { id: 17, nombre: 'Marta García', fechaIngreso: '2024-01-17', email: 'marta17@example.com', ciudad: 'Murcia' },
        { id: 18, nombre: 'Antonio Fernandez', fechaIngreso: '2024-01-18', email: 'antonio18@example.com', ciudad: 'Palma' },
        { id: 19, nombre: 'Sofía Ruiz', fechaIngreso: '2024-01-19', email: 'carmen19@example.com', ciudad: 'Las Palmas' },
        { id: 20, nombre: 'Jose Hernández', fechaIngreso: '2024-01-20', email: 'jose20@example.com', ciudad: 'Bilbao' }
    ];
    
    return res.status(200).json(datos);
};
