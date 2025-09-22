import helmet from 'helmet';
import cors from 'cors';
import { config } from '@/config';
import { Router } from 'express';

const router = Router();

// Helmet for basic security headers
router.use(helmet());

// CORS configuration
const corsOptions = {
  origin: config.cors.origin,
  credentials: true,
};
router.use(cors(corsOptions));

export const securityMiddleware = router;
