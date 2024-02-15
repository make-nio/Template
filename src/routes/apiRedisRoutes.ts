// routes/apiRedisRoutes.ts
import { Router } from 'express';
import { authenticateToken, validateAdminRole } from '../middlewares/authMiddleware';
import { obtenerTodosLosUsuarios, obtenerDatosUsuario, borrarEntradaRedis } from '../controllers/apiRedisController';

const router = Router();

//Redis:
router.post('/obtenerTodosLosUsuarios', authenticateToken, validateAdminRole, obtenerTodosLosUsuarios);

router.post('/obtenerDatosUsuario', authenticateToken, validateAdminRole, obtenerDatosUsuario);

router.post('/borrarEntradaRedis', authenticateToken, validateAdminRole, borrarEntradaRedis);



export default router;
