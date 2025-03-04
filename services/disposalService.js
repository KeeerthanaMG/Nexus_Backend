import db from '../config/db.js'; // Import the default object from db.js
const { pool } = db; // Extract pool from the default export
import { INSERT_DISPOSAL, GET_DISPOSAL } from "../queries/disposalQueries.js"; // Import query

// Function to insert a new disposal record
export const insertDisposal = async (assetid, repaired_on, disposaldate, reason, comments ) => {
    try {
        // Ensure valid date format before inserting
        const formattedRepairedOn = repaired_on ? new Date(repaired_on).toISOString().split("T")[0] : null;
        const formattedDisposalDate = new Date(disposaldate).toISOString().split("T")[0];

        const result = await pool.query(INSERT_DISPOSAL, [
            assetid, 
            formattedRepairedOn, 
            formattedDisposalDate, 
            reason, 
            comments
        ]);
        return result.rows[0];
    } catch (error) {
        console.error("Error in insertDisposal:", error.message);
        throw error;
    }
};


export async function getAllDisposed(){
    try{
        const result = await pool.query(GET_DISPOSAL);
        return result.rows;
    
    }
    catch(error){
        console.error("Error in displaying disposed:",error.message);
        throw error;

    }
}

export default {
    insertDisposal,
    getAllDisposed,
};
