// routes/apiRoutes.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware';
import { apiDefault, apiMockDefault } from '../controllers/apiController'

const router = Router();

router.get('/health', (req, res) => {
  // Aquí iría la lógica para recuperar y enviar algunos datos...
  res.json({ message: 'Health check OK!' });
});

// Puedes añadir más rutas de la API aquí...
router.post('/apiDefault', authenticateToken, apiDefault);

router.post('/apiMockDefault', authenticateToken, apiMockDefault);

export default router;
