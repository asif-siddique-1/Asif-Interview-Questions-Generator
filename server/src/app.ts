import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './utils/logger';
import { AppError } from './utils/AppError';
import { errorHandler } from './utils/errorHandler';
import healthRouter from './routes/health.route';
import { requestTime } from './middleware/requestTime';
import { skillExtractor } from './utils/skillExtractor';
import questionsRouter from './routes/questions.route';

const app = express();
const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(limit);
app.use(
  morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  }),
);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestTime);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('/test-skills', async (req, res) => {
  const skills = await skillExtractor(
    'This is a job description for a Full Stack Software Engineer position at ABC Inc. The ideal candidate will have 5+ years of experience in software development, proficiency in React, Node.js, and MongoDB, and be well-versed in Agile methodologies. The successful candidate will be responsible for developing new features for our web application, participating in code reviews, and collaborating with cross-functional teams to deliver high-quality software products.',
  );

  res.json({ skills });
});

app.use('/api/v1/questions', questionsRouter);
app.use('/api/v1/health', healthRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
