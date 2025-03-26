import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key';

// JWT Authentication middleware
export function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // The Authorization header must be in the format "Bearer <token>".
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token.' });
      }
      // Optionally attach user information to the request object
      (req as any).user = user;
      next();
    });
  } else {
    res.status(401).json({ error: 'Token not provided.' });
  }
}
