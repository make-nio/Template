// src/services/redisQueue.ts
import { createRedisInstance } from '../config/redisConfig';


// Crear dos instancias separadas de Redis
const redisPublisher = createRedisInstance();
const redisSubscriber = createRedisInstance();

export const subscribeToQueue = (queueName: string, callback: (message: string) => void) => {
  redisSubscriber.subscribe(queueName);
  redisSubscriber.on('message', (channel, message) => {
    if (channel === queueName) {
      callback(message);
    }
  });
};

export const publishToQueue = async (queueName: string, message: string) => {
  await redisPublisher.publish(queueName, message);
};

// Opcionalmente, exporta una función para cerrar las conexiones si es necesario
export const closeRedisConnections = () => {
  redisPublisher.disconnect();
  redisSubscriber.disconnect();
};