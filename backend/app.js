import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';
import { apiLimiter } from './middleware/rateLimit.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({
  origin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map(s => s.trim())
}));
app.use(express.json({ limit: '20kb' }));
app.use('/api', apiLimiter, routes);
app.use(notFound);
app.use(errorHandler);

export default app;
