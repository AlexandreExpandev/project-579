import express, { Application, Request, Response } from 'express';
import { config } from '@/config';
import { logger } from '@/utils/logger';
import { securityMiddleware } from '@/middleware/security';
import { requestLoggerMiddleware } from '@/middleware/requestLogger';
import { rateLimiter } from '@/middleware/rateLimiter';
import { errorHandler } from '@/middleware/errorHandler';
import { notFoundHandler } from '@/middleware/notFoundHandler';
import mainRouter from '@/routes';

const app: Application = express();

// Core Middleware
app.use(securityMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(requestLoggerMiddleware);
app.use(rateLimiter);

// Health Check Endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api', mainRouter);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port} in ${config.nodeEnv} mode`);
});

// Graceful Shutdown
const signals = ['SIGTERM', 'SIGINT'];

const gracefulShutdown = (signal: string) => {
  process.on(signal, () => {
    logger.info(`${signal} received, closing server gracefully...`);
    server.close(() => {
      logger.info('Server closed.');
      // Close database connection here if needed
      process.exit(0);
    });
  });
};

signals.forEach(gracefulShutdown);

export default app;
