import { findAssetById, insertAsset, updateAsset, deleteAsset } from '../services/assetServices.js';

//get an asset
export async function getAssetById(req, res) {
    const assetId = req.params.id;

    if (!assetId) {
        return res.status(400).json({ message: "Asset ID is required" });
    }

    try {
        const asset = await findAssetById(assetId);

        if (!asset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        res.json(asset);
    } catch (err) {
        console.error('Error fetching asset:', err.message);
        res.status(500).json({ error: 'Server Error' });
    }
}

//Controller to insert a new asset
export async function createAsset(req, res) {
    try {
        const newAsset = await insertAsset(req.body);
        res.status(201).json({ message: "Asset added successfully", data: newAsset });
    } catch (err) {
        console.error('Error adding asset:', err.message);
        res.status(500).json({ error: 'Server Error' });
    }
}


//update an asset
export async function updateAssetById(req, res) {
    const assetId = req.params.id;

    try {
        const updatedAsset = await updateAsset(assetId, req.body);

        if (!updatedAsset) {
            return res.status(404).json({ message: "Asset not found" });
        }

        res.json({ message: "Asset updated successfully", data: updatedAsset });
    } catch (err) {
        console.error('Error updating asset:', err.message);
        res.status(500).json({ error: 'Server Error' });
    }
}

//delete an asset
export async function deleteAssetById(req, res) {
    const assetId = req.params.id;

    try {
        const deletedAsset = await deleteAsset(assetId);

        if (!deletedAsset) {
            return res.status(404).json({ message: "Asset not found or already deleted" });
        }

        res.json({ message: "Asset deleted successfully" });
    } catch (err) {
        console.error('Error deleting asset:', err.message);
        res.status(500).json({ error: 'Server Error' });
    }
}

