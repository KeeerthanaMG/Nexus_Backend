import express from 'express';
import { fetchNotifications } from '../controllers/notificationsController.js';
import { fetchMaintenanceNotifications } from '../controllers/notificationsController.js';

const router = express.Router();

router.get('/', fetchNotifications);
router.get('/maintenance', fetchMaintenanceNotifications);

export default router;


