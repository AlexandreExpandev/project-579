import { Router } from 'express';
import externalRoutes from './external.routes';
import internalRoutes from './internal.routes';

const router = Router();

router.use('/v1/external', externalRoutes);
router.use('/v1/internal', internalRoutes);

export default router;
