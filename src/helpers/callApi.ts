//src/helpers/callApi.ts
import axios, { AxiosResponse } from 'axios';
import { CustomError } from '../helpers/errorManager';

const callApi = async (url: string, par: object | null, token: string): Promise<AxiosResponse<any>> => {
    try {
        // Extrae los headers de la solicitud original y agrega cualquier header de seguridad que consideres necesario
        const headers = {
            'Content-Type': 'application/json', // Asegúrate de que el Content-Type sea el adecuado para tu solicitud
            'authorization': 'Bearer ' + token
            // Aquí puedes agregar más headers de seguridad
        };
        console.log(headers)

        // Realiza la solicitud con axios
        const result = await axios.post(url, par, { headers });

        return result;
    } catch (err: any) {
        // Convertir el error de Axios a CustomError
        const customError = CustomError.fromError(err);
        console.log(customError); // Opcional: loguear el error formateado
        throw customError; // Lanzar el CustomError en lugar del error original de Axios
    }
};



export default callApi;

