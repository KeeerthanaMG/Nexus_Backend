import db from '../config/db.js';
import {
    GET_ALL_SOFTWARE,
    GET_SOFTWARE_BY_ID,
    INSERT_SOFTWARE,
    UPDATE_SOFTWARE,
    DELETE_SOFTWARE
} from '../queries/softwareQueries.js';

const { pool } = db; // Extract pool from db.js

// Fetch all software assets
export const fetchSoftwareAssets = async () => {
    const result = await pool.query(GET_ALL_SOFTWARE);
    return result.rows;
};

// Fetch software asset by ID
export const findSoftwareById = async (id) => {
    const result = await pool.query(GET_SOFTWARE_BY_ID, [id]);
    return result.rows[0]; 
};

// Insert a new software asset
export const insertSoftware = async (data) => {
    const {
        softwarename, softwareversion, purchasedate, assetid, licensetype,
        licenseexpirydate, assigneduserid, project, userstatus, vendor,
        licensepurchasedate, licensekey, serialnumber, licenseduration,
        licensecost, username, password, expiredstatus, renewaldate,
        renewalcost, comments
    } = data;

    await pool.query(INSERT_SOFTWARE, [
        softwarename, softwareversion, purchasedate, assetid, licensetype,
        licenseexpirydate, assigneduserid, project, userstatus, vendor,
        licensepurchasedate, licensekey, serialnumber, licenseduration,
        licensecost, username, password, expiredstatus, renewaldate,
        renewalcost, comments
    ]);

    return { message: "Software asset inserted successfully" };
};

// Update software asset
export const updateSoftware = async (id, data) => {
    try {
        // Validate required fields
        if (!id) throw new Error("Software ID is required");
        if (!data || Object.keys(data).length === 0) throw new Error("No update data provided");

        // Extract values from request data
        const {
            softwarename, softwareversion, purchasedate, assetid, licensetype,
            licenseexpirydate, assigneduserid, project, userstatus, vendor,
            licensepurchasedate, licensekey, serialnumber, licenseduration,
            licensecost, username, password, expiredstatus, renewaldate,
            renewalcost, comments
        } = data;

        // Ensure all values are provided (use default empty string if missing)
        const values = [
            softwarename || '', softwareversion || '', purchasedate || null, assetid || '',
            licensetype || '', licenseexpirydate || null, assigneduserid || '', project || '',
            userstatus || '', vendor || '', licensepurchasedate || null, licensekey || '',
            serialnumber || '', licenseduration || '', licensecost || 0, username || '',
            password || '', expiredstatus || '', renewaldate || null, renewalcost || 0, comments || '', id
        ];

        // Execute the update query
        const result = await pool.query(UPDATE_SOFTWARE, values);

        if (result.rowCount === 0) {
            throw new Error("Software asset not found or no changes made");
        }

        return { message: "Software asset updated successfully" };
    } catch (error) {
        throw new Error(`Update failed: ${error.message}`);
    }
};


// Delete software asset
export const deleteSoftware = async (id) => {
    const result = await pool.query(DELETE_SOFTWARE, [id]);

    if (result.rowCount === 0) {
        throw new Error("Software asset not found or already deleted");
    }

    return { message: "Software asset deleted successfully" };
};
