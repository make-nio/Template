// routes/index.ts
import express from 'express';
import frontendRoutes from './frontendRoutes';
import apiRoutes from './apiRoutes';
import apiLoginRoutes from './apiLoginRoutes';
import apiNotificacionesRoutes from './apiNotificacionesRoutes';
import apiredisRoutes from './apiRedisRoutes';

const router = express.Router();

// Rutas para el frontend
router.use('/', frontendRoutes);

// Rutas para la API
router.use('/api', apiRoutes);
router.use('/api', apiLoginRoutes);
router.use('/api', apiNotificacionesRoutes);
router.use('/api', apiredisRoutes);

export default router;
