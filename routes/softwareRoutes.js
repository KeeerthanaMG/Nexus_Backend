import express from 'express';
import {
    getSoftwareAssets,
    getSoftwareById,
    createSoftware,
    updateSoftwareById,
    deleteSoftwareById
} from '../controllers/softwareController.js';

const router = express.Router();

router.get('/', getSoftwareAssets);
router.get('/:id', getSoftwareById);
router.post('/', createSoftware);
router.put('/:id', updateSoftwareById);
router.delete('/:id', deleteSoftwareById);

export default router;
