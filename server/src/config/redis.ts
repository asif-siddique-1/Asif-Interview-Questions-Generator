import Redis from 'ioredis';
import config from './config';

export const connection = new Redis({
  host: config.redisUrl,
  port: 6379,
  maxRetriesPerRequest: null,
});
