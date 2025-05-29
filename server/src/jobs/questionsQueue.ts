import { Queue } from 'bullmq';
import { connection } from '../config/redis';

export const questionQueue = new Queue('question-generation', { connection });
