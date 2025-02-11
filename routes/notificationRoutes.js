import express from 'express';
import { fetchNotifications } from '../controllers/notificationsController.js';

const router = express.Router();

router.get('/', fetchNotifications);

export default router;


