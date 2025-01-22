import { Router } from 'express';
import emailController from '../controllers/emailController'; 

const router = Router();

router.post('/v1/verifyemail', emailController.register);

export default router;