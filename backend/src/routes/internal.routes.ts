import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth';

const router = Router();

// All internal routes are protected by the auth middleware
router.use(authMiddleware);

// This is where you will add your feature-specific routes.
// For example:
// import gameRoutes from './game.routes';
// router.use('/game', gameRoutes);

router.get('/status', (req, res) => {
  res.json({ message: 'Internal API is operational', user: req.user });
});

export default router;
