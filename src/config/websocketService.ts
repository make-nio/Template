// src/config/websocketService.ts

import { Server as WebSocketServer, Socket } from 'socket.io';
import { Server } from 'https';

import { subscribeToQueue } from '../helpers/redisQueue';

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

const onConnection = (socket: Socket): void => {
  console.log('Nuevo cliente conectado con id:', socket.id);

  // Suscribirse a los canales y reenviar mensajes
  suscribeAndForward(socket, 'canal_notificaciones', 'notificacion');
  suscribeAndForward(socket, 'canal_accion_frontend', 'accion_frontend');

  // Suscripción al canal de backend para manejo interno
  subscribeToQueue('canal_comunicacion_backend', manejarComunicacionBackend);
};

const suscribeAndForward = (socket: Socket, channel: string, event: string) => {
  subscribeToQueue(channel, (message: string) => {
    socket.emit(event, message);
  });
};

export const sendMessageToUser = (socketId: string, message: string) => {
  if (socketId && io) {
    io.to(socketId).emit('mensaje_personal', message);
  }
};

const manejarComunicacionBackend = (mensaje: string) => {
  console.log('Mensaje de backend recibido:', mensaje);
  // Lógica para procesar el mensaje
};

export const getWebSocketIO = (): WebSocketServerType => {
  return io;
};
