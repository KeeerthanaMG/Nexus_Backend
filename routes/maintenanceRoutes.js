import express from 'express';
import {
    getMaintenanceRecords,
    getMaintenanceById,
    createMaintenance,
    updateMaintenanceById,
    deleteMaintenanceById
} from '../controllers/maintenanceController.js';

const router = express.Router();

// Routes
router.get('/', getMaintenanceRecords);
router.get('/:id', getMaintenanceById);
router.post('/', createMaintenance);
router.put('/:id', updateMaintenanceById);
router.delete('/:id', deleteMaintenanceById);

export default router;
