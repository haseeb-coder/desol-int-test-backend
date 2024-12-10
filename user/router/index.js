import { Router } from 'express';
import UserController from '../controller';

const router = Router();

router.post('/login', UserController.login);

export default router;
