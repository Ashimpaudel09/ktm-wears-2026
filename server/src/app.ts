import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import productRoutes from './modules/product/product.routes';
import categoryRoutes from './modules/category/category.routes';
import authRoutes from './modules/auth/auth.routes';
import { adminAuth } from './middlewares/auth.middleware';
import { errorHandler, notFound } from './middlewares/error.middleware';

const app: Application = express();

/* ===================== SECURITY ===================== */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "blob:", "https://res.cloudinary.com"],
        connectSrc: ["'self'"],
      },
    },
  })
);

/* ===================== CORS (DEV ONLY) ===================== */
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );
}

/* ===================== PARSERS ===================== */
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* ===================== PERFORMANCE ===================== */
app.use(compression());

/* ===================== LOGGING ===================== */
app.use(process.env.NODE_ENV === 'development' ? morgan('dev') : morgan('combined'));

/* ===================== API ROUTES ===================== */
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.get('/api/auth/check', adminAuth, (_req: Request, res: Response) => {
  res.json({ success: true });
});

app.use('/api/products', adminAuth, productRoutes);
app.use('/api/categories', adminAuth, categoryRoutes);

if (process.env.NODE_ENV === 'production') {
  const rootDir = path.resolve(__dirname, '../../');
  const adminBuildPath = path.join(rootDir, 'client/admin/build/client');

  // Serve static files (JS/CSS/assets)
  app.use('/admin', express.static(adminBuildPath));

  // Catch-all for SPA — matches /admin, /admin/, and all subpaths
  app.get(/^\/admin(\/.*)?$/, (req: Request, res: Response) => {
    res.sendFile(path.join(adminBuildPath, 'index.html'));
  });
}

/* ===================== ERROR HANDLING ===================== */
app.use(notFound);
app.use(errorHandler);

export default app;
