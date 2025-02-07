import { Router } from 'express';
const router = Router();
import { getAssetById, createAsset, updateAssetById, deleteAssetById } from '../controllers/assetController.js';

router.get('/:id', getAssetById); // Route for getting an asset by ID
router.post('/', createAsset); //Route for inserting a new asset
router.put('/:id', updateAssetById);  // Update asset
router.delete('/:id', deleteAssetById);  // Delete asset

export default router;
