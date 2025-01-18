import { Router } from 'express';
import eventController from '../controllers/eventController';

const router = Router();

router.post('/events', eventController.logEvent);

export default router;