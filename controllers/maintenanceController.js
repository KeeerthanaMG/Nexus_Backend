import {
    fetchMaintenanceRecords,
    findMaintenanceById,
    insertMaintenance,
    updateMaintenance,
    deleteMaintenance
} from '../services/maintenanceServices.js';
import { handleError, handleSuccess } from '../errorHandler/errorHandler.js';

// Get all maintenance records
export async function getMaintenanceRecords(req, res) {
    try {
        const records = await fetchMaintenanceRecords();
        handleSuccess(res, records, 200, "Maintenance records retrieved successfully");
    } catch (err) {
        handleError(res, err);
    }
}

// Get maintenance by ID
export async function getMaintenanceById(req, res) {
    const maintenanceId = req.params.id;

    if (!maintenanceId) {
        return handleError(res, new Error("Maintenance ID is required"), 400, "Maintenance ID is required");
    }

    try {
        const record = await findMaintenanceById(maintenanceId);
        if (!record) {
            return handleError(res, new Error("Maintenance record not found"), 404, "Maintenance record not found");
        }
        res.json(record);
    } catch (err) {
        handleError(res, err);
    }
}

// Create a new maintenance record
export async function createMaintenance(req, res) {
    try {
        const newRecord = await insertMaintenance(req.body);
        handleSuccess(res, newRecord, 201, "Maintenance record added successfully");
    } catch (err) {
        handleError(res, err);
    }
}

// Update maintenance record
export async function updateMaintenanceById(req, res) {
    const maintenanceId = req.params.id;

    try {
        const updatedRecord = await updateMaintenance(maintenanceId, req.body);
        handleSuccess(res, updatedRecord, 200, "Maintenance record updated successfully");
    } catch (err) {
        handleError(res, err);
    }
}

// Delete maintenance record
export async function deleteMaintenanceById(req, res) {
    const maintenanceId = req.params.id;

    try {
        const deletedRecord = await deleteMaintenance(maintenanceId);
        handleSuccess(res, deletedRecord, 200, "Maintenance record deleted successfully");
    } catch (err) {
        handleError(res, err);
    }
}
