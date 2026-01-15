import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
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
        scriptSrc: ["'self'", "'unsafe-inline'"], // allow inline scripts if needed
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
      },
    },
  })
);

/* ===================== CORS (DEV ONLY) ===================== */
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:5173', // dev frontend
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


// /* ---------------- RATE LIMIT ---------------- */
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: 'Too many requests from this IP, please try again later.',
// });
// app.use('/api', limiter);

/* ===================== API ROUTES ===================== */
app.get('/api/health', (_, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.get('/api/auth/check', adminAuth, (_, res) => res.json({ success: true }));

app.use('/api/products', adminAuth, productRoutes);
app.use('/api/categories', adminAuth, categoryRoutes);

/* ===================== FRONTEND SERVING ===================== */
if (process.env.NODE_ENV === 'production') {
  const rootDir = path.resolve(__dirname, '../../');

  // ---------------- Admin SPA ----------------
  const adminBuildPath = path.join(rootDir, 'client/admin/build/client');
 console.log('📁 Admin build path:', adminBuildPath);
  console.log('📄 Index.html exists:', require('fs').existsSync(path.join(adminBuildPath, 'index.html')));


  app.use('/admin', express.static(adminBuildPath));
  app.get('/admin/*', (_, res) => {
    res.sendFile(path.join(adminBuildPath, 'index.html'));
  });

  // ---------------- Public SPA ----------------
  // const publicBuildPath = path.join(rootDir, 'client/web/build');
  // app.use('/', express.static(publicBuildPath));
  // app.get('*', (_, res) => {
  //   res.sendFile(path.join(publicBuildPath, 'index.html'));
  // });
}

/* ===================== ERROR HANDLING ===================== */
app.use(notFound);
app.use(errorHandler);

export default app;
