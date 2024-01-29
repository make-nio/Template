// routes/apiRoutes.ts
import { Router } from 'express';
import { apiDefault, login, logout } from '../controllers/apiController'

const router = Router();

router.get('/health', (req, res) => {
  // Aquí iría la lógica para recuperar y enviar algunos datos...
  res.json({ message: 'Health check OK!' });
});

// Puedes añadir más rutas de la API aquí...
router.post('/apiDefault', apiDefault);

router.post('/login', login);

router.post('/logout', logout);

export default router;
