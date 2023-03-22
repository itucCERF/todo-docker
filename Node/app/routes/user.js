import { Router } from 'express';
import userCtrl from './../controllers/UserController.js';

const router = Router();

router.get('/', userCtrl.getAll);
router.get("/:userId", userCtrl.detail);
router.put("/:userId", userCtrl.update);
router.delete("/:userId", userCtrl.delete);
router.post("/logout", userCtrl.logout);
router.post("/logout-all", userCtrl.logoutAll);

export default router;