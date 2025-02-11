import {
    fetchSoftwareAssets,
    findSoftwareById,
    insertSoftware,
    updateSoftware,
    deleteSoftware
} from '../services/softwareServices.js';
import { handleError, handleSuccess } from '../errorHandler/errorHandler.js';

// Get all software assets
export async function getSoftwareAssets(req, res) {
    try {
        const softwareAssets = await fetchSoftwareAssets();
        handleSuccess(res, softwareAssets, 200, "Software assets retrieved successfully");
    } catch (err) {
        handleError(res, err);
    }
}

// Get software asset by ID
export async function getSoftwareById(req, res) {
    const softwareId = req.params.id;

    if (!softwareId) {
        return handleError(res, new Error("Software ID is required"), 400, "Software ID is required");
    }

    try {
        const software = await findSoftwareById(softwareId);
        if (!software) {
            return handleError(res, new Error("Software asset not found"), 404, "Software asset not found");
        }
        handleSuccess(res, software, 200, "Software asset retrieved successfully");
    } catch (err) {
        handleError(res, err);
    }
}

// Create a new software asset
export async function createSoftware(req, res) {
    try {
        await insertSoftware(req.body);  
        handleSuccess(res, null, 201, "Asset inserted successfully");
    } catch (err) {
        handleError(res, err);
    }
}

// Update a software asset
export async function updateSoftwareById(req, res) {
    const softwareId = req.params.id;

    try {
        const updatedSoftware = await updateSoftware(softwareId, req.body);
        if (!updatedSoftware) {
            return handleError(res, new Error("Software asset not found"), 404, "Software asset not found");
        }
        handleSuccess(res, updatedSoftware, 200, "Software asset updated successfully");
    } catch (err) {
        handleError(res, err);
    }
}

// Delete a software asset
export async function deleteSoftwareById(req, res) {
    const softwareId = req.params.id;

    try {
        const deletedSoftware = await deleteSoftware(softwareId);
        if (!deletedSoftware) {
            return handleError(res, new Error("Software asset not found"), 404, "Software asset not found");
        }
        handleSuccess(res, null, 200, "Software asset deleted successfully");
    } catch (err) {
        handleError(res, err);
    }
}
