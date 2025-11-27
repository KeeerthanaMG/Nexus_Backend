import { insertDisposal,getAllDisposed } from "../services/disposalService.js";
import { handleError , handleSuccess } from "../errorHandler/errorHandler.js";

export const createDisposal = async (req, res) => {
    try {
        const { assetid, repaired_on, disposaldate, reason } = req.body;
        
        // Validate required fields
        if (!assetid || !repaired_on || !disposaldate || !reason) {
            return handleError(res, new Error("All fields are required"), 400, "All fields are required");
        }

        const newDisposal = await insertDisposal(assetid, repaired_on, disposaldate, reason);
        handleSuccess(res, newDisposal, 200, "Disposed Asset added successfully");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

export async function fetchDisposed(req, res) {
    try {
        const assets = await getAllDisposed();

        if (!assets || assets.length === 0) {
            return handleError(res, new Error("No assets found"), 404, "No assets found");
        }

        handleSuccess(res, assets, 200, "Disposed Asset retrieved successfully");
    } catch (err) {
        handleError(res, err);
    }
}
