import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';

/**
 * @summary
 * Placeholder for authentication middleware.
 * In a real application, this would verify a JWT or session token.
 */
export const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  // Example: Check for an Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For now, we'll just simulate a user and call next().
    // In a real app, you would throw an error:
    // return next(new AppError('Unauthorized: No token provided', 401));
  }

  // In a real app, you would decode the token and attach the user to the request.
  // const token = authHeader.split(' ')[1];
  // const decoded = verifyToken(token);
  // req.user = decoded;

  // --- SIMULATION --- 
  // This is a placeholder to simulate an authenticated user.
  // Remove this in a real implementation.
  req.user = { id: 'user-123', role: 'player' };
  // --- END SIMULATION ---

  next();
};
