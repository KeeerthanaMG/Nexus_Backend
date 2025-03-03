// inoutServices.js
import db from '../config/db.js'; // Import the default object from db.js
const { pool } = db;
import inoutQueries from '../queries/inoutQueries.js';

const inoutServices = {
    // Insert an entry in the inout table when an asset is inserted
    insertInOutAfterAssetInsert: async (assetId, userId, checkIn, checkOut) => {
        try {
            // If checkOut is provided but checkIn is not, insert NULL for checkIn
            console.log(checkIn,"CheckIn")
            checkIn = checkIn && checkIn != "false" ? checkIn : null;
            checkOut = checkOut && checkOut != "false" ? checkOut : null;
            console.log("🔍 Cleaned values for InOut insert:", { checkIn, checkOut });

            const result = await pool.query(inoutQueries.insertInOut, [
                assetId,
                userId,
                checkIn,
                checkOut
            ]);

            if (!result?.rows?.length) {
                throw new Error("InOut insertion failed, no rows returned");
            }

            return result.rows[0];
        } catch (error) {
            throw new Error(`Error inserting in inout: ${error.message}`);
        }
    },


    // Update check_out time when an asset is checked out
    updateCheckOut: async (checkIn, checkOut,assetId) => {
        try {
            const result = await pool.query(inoutQueries.updateCheckOut, [checkIn, checkOut, assetId]);
    
            if (!result.rowCount) {
                throw new Error("Check-in update failed, no rows affected.");
            }
    
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating check-in/check-out: ${error.message}`);
        }
    },
    


    // Fetch all inout records
    fetchAllInOutRecords: async () => {
        try {
            const result = await pool.query(inoutQueries.fetchAllInOutRecords);
            return result.rows;
        } catch (error) {
            throw new Error(`Error fetching inout records: ${error.message}`);
        }
    },

    // Find last inout entry for an asset
    findInOutByAssetId: async (assetId) => {
        try {
            const result = await pool.query(inoutQueries.findInOutByAssetId, [assetId]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error fetching inout for asset ${assetId}: ${error.message}`);
        }
    }
};

export default inoutServices;