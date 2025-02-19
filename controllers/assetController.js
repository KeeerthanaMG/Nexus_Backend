import { findAssetById, insertAsset, updateAsset, deleteAsset } from '../services/assetServices.js';
import { getAllAssets } from '../services/assetServices.js';
import { handleError } from '../errorHandler/errorHandler.js';
import { handleSuccess } from '../errorHandler/errorHandler.js';



export async function getAssetById(req, res) {
    const assetId = req.params.id;

    if (!assetId) {
        return handleError(res, new Error("Asset ID is required"), 400, "Asset ID is required");
    }

    try {
        const asset = await findAssetById(assetId);

        if (!asset) {
            return handleError(res, new Error("Asset not found"), 404, "Asset not found");
        }

        res.json(asset);
    } catch (err) {
        handleError(res, err);
    }
}




export async function getAllAssetsController(req, res) {
    try {
        const assets = await getAllAssets();

        if (!assets || assets.length === 0) {
            return handleError(res, new Error("No assets found"), 404, "No assets found");
        }

        handleSuccess(res, assets, 200, "Asset retrieved successfully");
    } catch (err) {
        handleError(res, err);
    }
}




//Controller to insert a new asset
export async function createAsset(req, res) {
    try {
        const newAsset = await insertAsset(req.body);
        handleSuccess(res, newAsset, 201, "Asset added successfully");
    } catch (err) {
        console.error('Error adding asset:', err.message);
        handleError(res, err);
    }
}


//update an asset
export async function updateAssetById(req, res) {
    const assetId = req.params.id;

    try {
        const updatedAsset = await updateAsset(assetId, req.body);

        if (!updatedAsset) {
            return handleError(res, new Error("Asset not found"), 404, "Asset not found");
        }

        handleSuccess(res, updatedAsset, 201, "Asset updated successfully");
    } catch (err) {
        console.error('Error updating asset:', err.message);
        handleError(res, err);
    }
}

//delete an asset
export async function deleteAssetById(req, res) {
    const assetId = req.params.id;

    try {
        const deletedAsset = await deleteAsset(assetId);

        if (!deletedAsset) {
            return handleError(res, new Error("Asset not found or already deleted"), 404, "Asset not found or already deleted");
        }

        handleSuccess(res, deletedAsset, 200, "Asset deleted successfully"); 
    } catch (err) {
        handleError(res, err); 
    }
}