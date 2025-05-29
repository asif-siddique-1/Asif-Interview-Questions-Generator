import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  openAiApiKey: string;
  redisUrl: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  redisUrl: process.env.REDIS_URL || '',
};

export default config;
