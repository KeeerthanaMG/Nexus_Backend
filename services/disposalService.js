import db from '../config/db.js'; // Import the default object from db.js
const { pool } = db; // Extract pool from the default export
import { INSERT_DISPOSAL, GET_DISPOSAL } from "../queries/disposalQueries.js"; // Import query

// Function to insert a new disposal record
export const insertDisposal = async (assetid, repaired_on, disposaldate, reason, comments ) => {
    try {
        const result = await pool.query(INSERT_DISPOSAL, [assetid, repaired_on, disposaldate, reason, comments]);
        return result.rows[0]; // Return the inserted row
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
