// routes/apiLoginRoutes.ts
import { Router } from 'express';
import { authenticateToken, authenticateTokenWithoutExpiry } from '../middlewares/authMiddleware';
import { login, logout, onlyClearCookies } from '../controllers/apiLoginController'

const router = Router();

//Login:
router.post('/login', login);

router.post('/logout', authenticateToken, logout);

router.post('/clearCookies', authenticateTokenWithoutExpiry, onlyClearCookies);

export default router;