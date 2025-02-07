import { Router } from 'express';
const router = Router();
import { getAssetById, createAsset } from '../controllers/assetController.js';

router.get('/:id', getAssetById); // Route for getting an asset by ID
router.post('/', createAsset); //Route for inserting a new asset


export default router;
