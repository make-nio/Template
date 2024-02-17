//src/helpers/callApi.ts
import axios, { AxiosResponse } from 'axios';
import https from 'https';

const agent = new https.Agent({  
  rejectUnauthorized: false // agregar esta línea desactiva la verificación de certificados
});


const callApiServer = async (url: string, par: object | null, token: string): Promise<AxiosResponse<any>> => {
    try {
        // Extrae los headers de la solicitud original y agrega cualquier header de seguridad que consideres necesario
        const headers = {
            'Content-Type': 'application/json', // Asegúrate de que el Content-Type sea el adecuado para tu solicitud
            'authorization': 'Bearer ' + token
            // Aquí puedes agregar más headers de seguridad
        };
        console.log(headers)

        // Realiza la solicitud con axios
        const result = await axios.post(url, par, { headers, httpsAgent: agent });

        return result;
    } catch (err: any) {
        console.log(err.response?.data || err.message || err);
        throw err;
    }
};



export default callApiServer;

