// routes/apiNotificacionesRoutes.ts
import { Router } from 'express';
import { authenticateToken, validateAdminRole } from '../middlewares/authMiddleware';
import { enviarNotificacion, enviarNotificacionUsuario, ejecutarAccionUsuario, ejecutarAccionFrontend, comunicarConBackend } from '../controllers/apiNotificacionesController'

const router = Router();

//Notificaciones:
router.post('/enviarNotificacion', authenticateToken, validateAdminRole, enviarNotificacion);

router.post('/enviarNotificacionUsuario', authenticateToken, validateAdminRole, enviarNotificacionUsuario);

router.post('/ejecutarAccionFrontend', authenticateToken, validateAdminRole, ejecutarAccionFrontend);

router.post('/ejecutarAccionUsuario', authenticateToken, validateAdminRole, ejecutarAccionUsuario);

router.post('/comunicarConBackend', authenticateToken, validateAdminRole, comunicarConBackend);

export default router;