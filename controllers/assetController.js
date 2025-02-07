import { findAssetById, insertAsset } from '../services/assetServices.js';


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