// routes/apiRoutes.ts
import { Router } from 'express';
import { authenticateToken, validateAdminRole, authenticateTokenWithoutExpiry } from '../middlewares/authMiddleware';
import { apiDefault } from '../controllers/apiController'
import { login, logout, onlyClearCookies } from '../controllers/apiLoginController'
import { enviarNotificacion, enviarNotificacionUsuario, ejecutarAccionUsuario, ejecutarAccionFrontend, comunicarConBackend } from '../controllers/apiNotificacionesController'
import { obtenerTodosLosUsuarios, obtenerDatosUsuario, borrarEntradaRedis } from '../controllers/apiRedisController';

const router = Router();

router.get('/health', (req, res) => {
  // Aquí iría la lógica para recuperar y enviar algunos datos...
  res.json({ message: 'Health check OK!' });
});

// Puedes añadir más rutas de la API aquí...
router.post('/apiDefault', authenticateToken, apiDefault);

//Login:
router.post('/login', login);

router.post('/logout', authenticateToken, logout);

router.post('/clearCookies', authenticateTokenWithoutExpiry, onlyClearCookies);

//Notificaciones:
router.post('/enviarNotificacion', authenticateToken, validateAdminRole, enviarNotificacion);

router.post('/enviarNotificacionUsuario', authenticateToken, validateAdminRole, enviarNotificacionUsuario);

router.post('/ejecutarAccionFrontend', authenticateToken, validateAdminRole, ejecutarAccionFrontend);

router.post('/ejecutarAccionUsuario', authenticateToken, validateAdminRole, ejecutarAccionUsuario);

router.post('/comunicarConBackend', authenticateToken, validateAdminRole, comunicarConBackend);

//Redis:
router.post('/obtenerTodosLosUsuarios', authenticateToken, validateAdminRole, obtenerTodosLosUsuarios);

router.post('/obtenerDatosUsuario', authenticateToken, validateAdminRole, obtenerDatosUsuario);

router.post('/borrarEntradaRedis', authenticateToken, validateAdminRole, borrarEntradaRedis);



export default router;
