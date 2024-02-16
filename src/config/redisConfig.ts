//src/config/redisConfig.ts
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// Configuración predeterminada
const defaultOptions: any = {
  host: process.env.REDIS_HOST || '192.168.1.103',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || '0f6c4315',
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
  //TODO: Averiguar si al usar createRedisInstance esto tiene un TTL y se desconecta por timeout, cuanto dura ese TTL y si se reconecta automaticamente.
};

// Crear una función para crear una nueva instancia de Redis
export const createRedisInstance = () => new Redis(defaultOptions);

const redis: Redis = createRedisInstance();

redis.on('connect', () => {
  console.log('Conectado a Redis');
});

redis.on('error', (err: any) => {
  console.error('Error al conectar a Redis:', err);
});

export default redis;
