import db from '../config/db.js'; // Import the database pool
import queries from '../queries/assetQueries.js';

const { pool } = db; // Extract the pool from db.js

// Function to view more asset details
export async function findAssetById(assetId) {
    try {
        const result = await pool.query(queries.findAssetById, [assetId]);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
        console.error('Error executing findAssetById query:', err);
        throw new Error(err.message);
    }
}

export async function getAllAssets() {
    try {
        const result = await db.pool.query(queries.fetchAll); // Adjust table name if needed
        return result.rows;
    } catch (error) {
        console.error("❌ Error fetching assets:", error.message);
        throw error;
    }
}

// Function to add an asset
export async function insertAsset(assetData) {
    let status = assetData.status || null;

    // Determine asset status

    try {
        
        const requestResult = await pool.query(
            queries.request
        );

        let newRequestId = "REQ-1"; // Default for the first entry

        if (requestResult.rows.length > 0) {
            const lastRequestId = requestResult.rows[0].request_id; // Example: "REQ-17"
            const lastNumber = parseInt(lastRequestId.split('-')[1], 10); // Extracts 17
            newRequestId = `REQ-${lastNumber + 1}`; // Generates "REQ-18"
        }

    
        const assetValues = [
            assetData.assetid,
            assetData.assettype,
            assetData.make || null,
            assetData.productid || null,
            assetData.purchasedate || null,
            assetData.retailer || null,
            assetData.warrantyexpiry || null,
            assetData.assigneduserid || null,
            assetData.location || null,
            assetData.status || null, // Updated status
            assetData.lastcheckoutdate || null,
            assetData.size || null,
            assetData.operatingsystem || null,
            assetData.typeofos || null,
            assetData.productkey || null,
            assetData.processor || null,
            assetData.ram || null,
            assetData.harddisktype || null,
            assetData.harddisksize || null,
            assetData.harddiskmodel || null,
            assetData.resolution || null,
            assetData.graphicscardmodel || null,
            assetData.externaldongledetails || null,
            assetData.check_in || null,
        ];

        const assetResult = await pool.query(queries.insertAsset, assetValues);
        const insertedAsset = assetResult.rows[0];

        if (assetData.lastcheckoutdate && !assetData.check_in) {
            const inOutValues = [
                newRequestId, // Correctly generated request_id
                assetData.assetid,
                assetData.assigneduserid,
                assetData.lastcheckoutdate,
                assetData.check_in, // check_in is NULL
            ];

            await pool.query(queries.insertInOut, inOutValues);
        }

        return insertedAsset;
    } catch (err) {
        console.error('Error inserting asset:', err);
        throw new Error(err.message);
    }
}



// Function to update an asset
export async function updateAsset(assetId, assetData) {
    const values = [
        assetData.assettype,
        assetData.make,
        assetData.productid,
        assetData.purchasedate,
        assetData.retailer,
        assetData.warrantyexpiry,
        assetData.assigneduserid,
        assetData.location,
        assetData.status,
        assetData.lastcheckoutdate,
        assetData.size,
        assetData.operatingsystem,
        assetData.typeofos,
        assetData.productkey,
        assetData.processor,
        assetData.ram,
        assetData.harddisktype,
        assetData.harddisksize,
        assetData.harddiskmodel,
        assetData.resolution,
        assetData.graphicscardmodel,
        assetData.externaldongledetails,
        assetData.check_in,
        assetId,
    ];

    try {
        const result = await pool.query(queries.updateAsset, values);
        return result.rowCount > 0 ? result.rows[0] : null;
    } catch (err) {
        console.error('Error executing updateAsset query:', err);
        throw new Error(err.message);
    }
}

// Function to delete an asset
export async function deleteAsset(assetId) {
    try {
        const result = await pool.query(queries.deleteAsset, [assetId]);
        return result.rowCount > 0 ? result.rows[0] : null;
    } catch (err) {
        console.error('Error executing deleteAsset query:', err);
        throw new Error(err.message);
    }
}
