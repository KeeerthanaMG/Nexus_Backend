// services/countServices.js
import db from '../config/db.js'; // Import your database configuration
import { COUNT_QUERIES } from '../queries/countQueries.js'; // Import count queries
const { pool } = db; // Extract pool from db.js

// Function to get row count for all tables
export const getAllRowCounts = async () => {
    try {
        const counts = {};

        // Loop through each table in COUNT_QUERIES and execute the query
        for (const table in COUNT_QUERIES) {
            const query = COUNT_QUERIES[table];
            const result = await pool.query(query);
            counts[table] = result.rows[0].count; // Store count for each table
        }

        return counts; // Return the counts for all tables
    } catch (error) {
        console.error('❌ Error getting row count:', error.message);
        throw error; // Rethrow the error for the controller to handle
    }
};
