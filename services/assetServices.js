import db from '../config/db.js'; // Import the database pool
import queries from '../queries/assetQueries.js';
import inoutServices from './inoutServices.js';

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
        if (!assetData || !Array.isArray(assetData.data) || assetData.data.length === 0) {
            throw new Error("Invalid asset data: data array is missing or empty");
        }

        const asset = assetData.data[0]; // First object in data array
        console.log("Inserting asset data:", asset);

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
            asset.typeOfOs || null,
            asset.productKey || null,
            asset.processor || null,
            asset.ram || null,
            asset.hardDiskType || null,
            asset.hardDiskSize || null,
            asset.hardDiskModel || null,
            asset.resolution || null,
            asset.graphicsCardModel || null,
            asset.externalDongleDetails || null,
            asset.checkIn || null  // Ensure correct naming here
        ];

        console.log('Executing INSERT query with values:', assetValues);
        const assetResult = await pool.query(queries.insertAsset, assetValues);

        if (!assetResult.rows || assetResult.rows.length === 0) {
            throw new Error("Asset insertion failed, no rows returned");
        }

        console.log('Asset inserted:', assetResult.rows[0]);

        // If asset has assignedUserId, handle inout insertion
        if (asset.assignedUserId && asset.lastCheckoutDate) {
            await inoutServices.insertInOutAfterAssetInsert(asset.assetId, asset.assignedUserId, asset.checkIn, asset.lastCheckoutDate);
            console.log(`Check-in/check-out recorded for asset ID: ${asset.assetId}`);
        }

        return assetResult.rows[0];
    } catch (err) {
        console.error('Error inserting asset:', err.message);
        throw new Error(err.message);
    }
}


// Function to update an asset

export async function updateAsset(assetId, assetData) {
    try {
        console.log("📤 Updating Asset ID:", assetId);
        console.log("📦 Incoming Update Data:", JSON.stringify(assetData, null, 2));

        // ✅ Check if asset exists before updating
        const existingAsset = await findAssetById(assetId);
        if (!existingAsset) {
            throw new Error(`❌ Asset Not Found: ${assetId}`);
        }

        // ✅ Dynamically build update fields based on provided data
        const updateFields = [];
        const values = [];
        let valueIndex = 1;

        for (const [key, value] of Object.entries(assetData)) {
            if (value !== undefined) { // Only update fields with provided values
                updateFields.push(`${key} = $${valueIndex}`);
                values.push(value);
                valueIndex++;
            }
        }

        if (updateFields.length === 0) {
            throw new Error("❌ No valid fields provided for update.");
        }

        values.push(assetId); // Last value is always assetId

        const query = `UPDATE public."assetmanage" SET ${updateFields.join(", ")} WHERE assetid = $${valueIndex} RETURNING *`;

        console.log("🚀 Executing Dynamic UPDATE Query:", query);
        console.log("📊 Values for Query:", values);

        const result = await pool.query(query, values);

        if (!result.rowCount) {
            throw new Error("❌ Asset update failed, no rows affected.");
        }

        console.log(`✅ Asset Updated Successfully: ${assetId}`, result.rows[0]);

        // 🔄 Update InOut table if check_in is provided
        if (assetData.check_in) {
            console.log(`🔄 Updating InOut table for Asset ID: ${assetId}`);
            await inoutServices.updateCheckOut(
                assetData.check_in,  
                assetData.lastcheckoutdate || existingAsset.lastcheckoutdate, 
                assetId
            );
            
        }

        return {
            message: "✅ Asset updated successfully",
            data: result.rows[0]
        };

    } catch (err) {
        console.error("❌ Error executing updateAsset query:", err.message);
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

/* export async function disposeAsset(assetId){
    try{
        const result = await pool.query(queries.disposeAsset, [assetId])
    }
} */
