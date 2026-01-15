import { Request, Response, NextFunction } from 'express';
import { verifyAdminToken, AdminJwtPayload } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  admin?: AdminJwtPayload;
}

export function adminAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.admin_session;

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const payload = verifyAdminToken(token);
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired session' });
  }
}
