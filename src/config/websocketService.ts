// src/config/websocketService.ts
import { Server as WebSocketServer, Socket } from 'socket.io';
import { Server } from 'https';
import jwt from 'jsonwebtoken';
import { subscribeToQueue } from '../helpers/redisQueue';
import { saveOnRedis, clearOnRedis } from '../services/backend/beRedisServices';

type WebSocketServerType = WebSocketServer | null;

let io: WebSocketServerType = null;

export const initializeWebSocket = (httpsServer: Server): WebSocketServerType => {
  io = new WebSocketServer(httpsServer, {
    cors: {
      origin: '*', // Especifica aquí los orígenes permitidos o deja '*' para desarrollo
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', onConnection);
  return io;
};

const onConnection = async (socket: Socket): Promise<void> => {
  // Autenticar el token aquí
  if (socket?.handshake?.auth && socket?.handshake?.auth?.token) {
    const token: string = socket?.handshake?.auth?.token;
    try {
      // Verifica el token
      const secret: string = process.env.ACCESS_TOKEN_SECRET || 'ex1gmMMOySfu3nGHOySfu3nGH';
      const user: any = jwt.verify(token, secret);
      console.log('Usuario autenticado:', user);
      console.log('Nuevo cliente conectado con id:', socket.id);
      
      // Si la verificación es exitosa, procede con la suscripción y demás lógica

      // Guardo en la BBDD Redis el socketid del usuario.
      await saveOnRedis(user, token, socket.id);
      
      // Suscribirse a los canales y reenviar mensajes
      suscribeAndForward(socket, 'canal_notificaciones', 'notificacion');
      suscribeAndForward(socket, 'canal_accion_frontend', 'accion_frontend');

      // Suscripción al canal de backend para manejo interno
      subscribeToQueue('canal_comunicacion_backend', manejarComunicacionBackend);

      // Manejar evento de desconexión
      socket.on('disconnect', () => onDisconnect(socket, user, token));

    } catch (error: any) {
      // Si la verificación falla, desconecta el socket
      console.error('Error en la autenticación ws:', error.message);
      //TODO: Ver como borrar las cookies del usuario!!
      socket.disconnect();
    }
  } else {
    // Si no hay token, desconecta el socket
    console.log('No hay token de autenticación ws');
    socket.disconnect();
  }
};

const onDisconnect = async (socket: Socket,user: string, token: string) : Promise<void> => {
  console.log(`Cliente desconectado con id: ${socket.id}`);
  // Aquí puedes agregar cualquier lógica adicional que necesites ejecutar cuando un cliente se desconecta.
  await clearOnRedis({user}, token);
};

const suscribeAndForward = (socket: Socket, channel: string, event: string) => {
  subscribeToQueue(channel, (message: string) => {
    socket.emit(event, message);
  });
};

export const sendMessageToUser = (socketId: string, message: string): void => {
  if (socketId && io) {
    
    io.to(socketId).emit('mensaje_personal', message);
  }
};

export const sendactionToUser = (socketId: string, accion: any): void => {
  if (socketId && io) {
    const message = JSON.stringify(accion);
    io.to(socketId).emit('accion_personal', message);
  }
};

const manejarComunicacionBackend = (mensaje: string) => {
  console.log('Mensaje de backend recibido:', mensaje);
  // Lógica para procesar el mensaje
};

export const getWebSocketIO = (): WebSocketServerType => {
  return io;
};
