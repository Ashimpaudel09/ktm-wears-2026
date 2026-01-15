import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AdminJwtPayload extends JwtPayload {
  role: 'admin';
}

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET not defined');
}

export function signAdminToken(): string {
  return jwt.sign(
    { role: 'admin' },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

export function verifyAdminToken(token: string): AdminJwtPayload {
  return jwt.verify(token, JWT_SECRET) as AdminJwtPayload;
}
