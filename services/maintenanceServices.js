import db from '../config/db.js';
import {
    GET_ALL_MAINTENANCE,
    GET_MAINTENANCE_BY_ID,
    INSERT_MAINTENANCE,
    UPDATE_MAINTENANCE,
    DELETE_MAINTENANCE
} from '../queries/maintenanceQueries.js';

const { pool } = db;

export const fetchMaintenanceRecords = async () => {
    const result = await pool.query(GET_ALL_MAINTENANCE);
    return result.rows;
};

export const findMaintenanceById = async (id) => {
    const result = await pool.query(GET_MAINTENANCE_BY_ID, [id]);
    return result.rows[0];
};

export const insertMaintenance = async (data) => {
    const { assetid, issue, resolution_date, cost, vendor, approval_status, comments, request_date } = data;

    if (!assetid || !issue || !cost || !vendor) {
        throw new Error("Required fields are missing (assetid, issue, cost, vendor)");
    }

    const result = await pool.query(INSERT_MAINTENANCE, [
        assetid, issue, resolution_date, cost, vendor, approval_status, comments, request_date
    ]);

    return { message: "Maintenance record inserted successfully", maintenanceid: result.rows[0].maintenanceid };
};

export const updateMaintenance = async (id, data) => {
    const { assetid, issue, resolution_date, cost, vendor, approval_status, comments, request_date } = data;

    const result = await pool.query(UPDATE_MAINTENANCE, [
        assetid, issue, resolution_date, cost, vendor, approval_status, comments, request_date, id
    ]);

    if (result.rowCount === 0) {
        throw new Error("Maintenance record not found or not updated");
    }

    return { message: "Maintenance record updated successfully" };
};

export const deleteMaintenance = async (id) => {
    const result = await pool.query(DELETE_MAINTENANCE, [id]);

    if (result.rowCount === 0) {
        throw new Error("Maintenance record not found or already deleted");
    }

    return { message: "Maintenance record deleted successfully" };
};
