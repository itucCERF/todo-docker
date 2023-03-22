import { Router } from 'express';
import authCtrl from './../controllers/AuthController.js';
const router = Router();

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

export default router;
