import axios, { AxiosResponse } from 'axios';
import { Request } from 'express';

const callApi = async (req: Request, par: object, url: string): Promise<AxiosResponse<any>> => {
    try {
        // Extrae los headers de la solicitud original y agrega cualquier header de seguridad que consideres necesario
        const headers = {
            ...req.headers,
            'Content-Type': 'application/json', // Asegúrate de que el Content-Type sea el adecuado para tu solicitud
            // Aquí puedes agregar más headers de seguridad
        };

        // Realiza la solicitud con axios
        const result = await axios.post(url, par, { headers });

        return result;
    } catch (err: any) {
        console.log(err.response?.data || err.message || err);
        throw err;
    }
};

export default callApi;

