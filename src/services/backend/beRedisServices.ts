//src/services/backend/beAuthServices
import { Request } from 'express';
import redis from '../../config/redisConfig'
import { sendMessageToUser, sendactionToUser } from '../../config/websocketService'

// Función para guardar en redis con verificación
export const saveOnRedis = async (userData: any, token: string, socketId: string | null): Promise<void> => {
    const user = userData.user;
    const newClientData = { token, socketId };

    // Obtener datos existentes del usuario, si los hay.
    const existingUserDataJson = await redis.hget('users', user);
    let existingUserData;

    if (existingUserDataJson) {
        // Convertir los datos existentes de string JSON a un objeto.
        existingUserData = JSON.parse(existingUserDataJson);

        // Comprobar si los datos están en el formato antiguo o nuevo.
        if (!existingUserData.clients) {
            // Formato antiguo: convertir al nuevo formato.
            existingUserData = {
                nombre: existingUserData.nombre,
                user,
                rol: existingUserData.rol,
                clients: [newClientData] // Inicializar con el nuevo cliente.
            };
        } else {
            // Formato nuevo: agregar la nueva sesión al array de clients.
            // Eliminar cualquier entrada existente con el mismo token
            existingUserData.clients = existingUserData.clients.filter((client: any) => client.token !== token);
            existingUserData.clients.push(newClientData);
        }
    } else {
        // Si no existen datos previos, inicializar un nuevo objeto.
        existingUserData = {
            nombre: userData.nombre,
            user,
            rol: userData.rol,
            clients: [newClientData] // Inicializar con el nuevo cliente.
        };
    }

    // Guardar el objeto actualizado (que incluye el array de clients) en Redis.
    await redis.hset('users', user, JSON.stringify(existingUserData));
};

// Función para borrar en redis con verificación
export const clearOnRedis = async (arg: Request | any, token: string): Promise<void> => {

    let userData: Request | any = undefined;
    // Comprobar si el argumento es una petición HTTP o ya es userData
    if (arg.nombre) {
        // Suponemos que si arg tiene una propiedad 'user', es userData
        userData = arg as any;
    } else {
        // Si no, asumimos que es una petición HTTP y extraemos userData
        userData = (arg as Request).user;
    }

    console.log('User a borrar:', userData?.user);

    // Verificar si el usuario existe en Redis.
    const userDataJson = await redis.hget('users', userData?.user);
    if (userDataJson) {
        const storedUserData: any = JSON.parse(userDataJson);

        // Comprobar si los datos están en el formato antiguo o nuevo.
        if (!storedUserData.clients) {
            // Formato antiguo, borrar toda la entrada.
            await redis.hdel('users', userData?.user);
        } else {
            // Formato nuevo, proceder con la lógica de filtrado.
            storedUserData.clients = storedUserData.clients.filter((client: any) => client.token !== token);

            if (storedUserData.clients.length === 0) {
                // Si no quedan más clientes, borrar toda la entrada del usuario.
                await redis.hdel('users', userData?.user);
            } else {
                // Si aún quedan clientes, actualizar la entrada del usuario en Redis.
                await redis.hset('users', userData?.user, JSON.stringify(storedUserData));
            }
        }
    }
};

// Función para Enviar mensaje a un usuario
export const wsSendMessageToUser = async (user: string, messageData: any): Promise<any> => {
    
    const userData: string | null = await redis.hget('users', user);
    if (!userData)
        return {success: false, message: 'Usuario no encontrado!'};

    const userDataObj: any = JSON.parse(userData);

    // Verificar si hay sockets asociados al usuario
    if (!userDataObj.clients || userDataObj.clients.length === 0)
        return {success: false, message: 'No hay sockets asociados con el usuario!'};

    const message: string = JSON.stringify(messageData);

    // Enviar mensaje a cada socket asociado
    userDataObj.clients.forEach((client: { socketId: string }) => {
        sendMessageToUser(client.socketId, message);
    });

    return {success: true, message: 'Mensaje enviado con éxito a todos los sockets!'};

};

// Función para Enviar accion a un usuario
export const wsSendActionToUser = async (user: string, messageData: any): Promise<any> => {
    
    const userData: string | null = await redis.hget('users', user);
    if (!userData)
        return {success: false, message: 'Usuario no encontrado!'};

    const userDataObj: any = JSON.parse(userData);

    // Verificar si hay sockets asociados al usuario
    if (!userDataObj.clients || userDataObj.clients.length === 0)
        return {success: false, message: 'No hay sockets asociados con el usuario!'};

    // Enviar mensaje a cada socket asociado
    userDataObj.clients.forEach((client: { socketId: string }) => {
        sendactionToUser(client.socketId, messageData);
    });

    return {success: true, message: 'Mensaje enviado con éxito a todos los sockets!'};

};

// Función para obtener todos los usuarios de Redis
export const getAllUsersFromRedis = async (): Promise<any> => {
    const users = await redis.hgetall('users');
    if (!users) return [];

    return Object.keys(users).map(key => {
        return { user: key, data: JSON.parse(users[key]) };
    });
};

// Función para obtener los datos de un usuario específico
export const getUserDataFromRedis = async (user: string): Promise<any> => {
    const userDataJson = await redis.hget('users', user);
    return userDataJson ? JSON.parse(userDataJson) : null;
};

// Función para borrar una entrada de Redis dado su clave
export const deleteEntryFromRedis = async (user: string): Promise<void> => {
    const result = await redis.hdel('users', user);
    console.log('Resultado de borrado de entrada Redis: ', result)
};
