import { Router, Request, Response } from 'express';
import { signAdminToken } from '../../utils/jwt';

const router = Router();

const ADMIN_USER = process.env.ADMIN_USERNAME!;
const ADMIN_PASS = process.env.ADMIN_PASSWORD!;

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username: string;
    password: string;
  };

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signAdminToken();

  res.cookie('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000,
    path: '/',
  });


  res.json({ success: true });
});

router.post('/logout', (_: Request, res: Response) => {
  res.clearCookie('admin_session');
  res.json({ success: true });
});

export default router;
