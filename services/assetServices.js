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
    try {
        // Ensure we're correctly accessing the first element in the `data` array
        const asset = assetData.data[0]; // Access the first object from the `data` array
        console.log("Inserting asset data:", asset);

        // Check if assetId is provided and throw an error if not
        if (!asset.assetId) {
            throw new Error("Asset ID is required");
        }

        const assetValues = [
            asset.assetId,
            asset.assetType,
            asset.make || null,
            asset.productId || null,
            asset.purchaseDate || null,
            asset.retailer || null,
            asset.warrantyExpiry || null,
            asset.assignedUserId || null,
            asset.location || null,
            asset.status || null, 
            asset.lastCheckoutDate || null,
            asset.size || null,
            asset.operatingSystem || null,
            asset.typeOfOS || null,
            asset.productKey || null,
            asset.processor || null,
            asset.ram || null,
            asset.hardDiskType || null,
            asset.hardDiskSize || null,
            asset.hardDiskModel || null,
            asset.resolution || null,
            asset.graphicsCardModel || null,
            asset.externalDongleDetails || null,
            asset.check_in || null,
        ];

        // Log the query before running it
        console.log('Executing query with values:', assetValues);

        // Assuming queries.insertAsset is your query to insert the asset
        const assetResult = await pool.query(queries.insertAsset, assetValues);

        console.log('Asset inserted:', assetResult.rows);

        return assetResult.rows[0];
    } catch (err) {
        console.error('Error inserting asset:', err.message);
        throw new Error(err.message);  // Re-throw the error to be handled in the controller
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

        if (result.rowCount > 0) {
            // If check_in is provided, update in_out table
            if (assetData.check_in !== undefined) {
                await updateInOutTable(assetId, assetData.check_in);
            }
            return result.rows[0];
        }
        return null;
    } catch (err) {
        console.error('Error executing updateAsset query:', err);
        throw new Error(err.message);
    }
}

// Function to update the in_out table
async function updateInOutTable(assetId, checkInValue) {
    const values = [checkInValue, assetId];

    try {
        await pool.query(queries.updateinout, values);
    } catch (err) {
        console.error('Error updating in_out table:', err);
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
