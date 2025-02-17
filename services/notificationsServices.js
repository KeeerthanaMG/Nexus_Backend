import db from '../config/db.js'; // Import the default object from db.js
const { pool } = db; // Extract pool from the default export
import dayjs from 'dayjs'; // Date handling library
import { GET_EXPIRING_LICENSES_QUERY, GET_MAINTENANCE_NOTIFICATION_QUERY } from '../queries/notificationsQueries.js'; // Ensure the query is correctly imported

// Function to fetch licenses expiring in the next 30 days
export const getExpiringLicenses = async () => {
    try {
        const today = dayjs(); 
        const next30Days = today.add(30, 'days').format('YYYY-MM-DD'); // Get the date 30 days from today

        const result = await pool.query(GET_EXPIRING_LICENSES_QUERY, [
            today.format('YYYY-MM-DD'),
            next30Days
        ]);

        return result.rows;
    } catch (error) {
        console.error(" Error in getExpiringLicenses:", error.message);
        throw error; 
    }
};


export const getPendingMaintenanceNotifications = async () => {
    try {
        const today = dayjs(); 
        const fiveDaysAgo = today.subtract(5, 'days').format('YYYY-MM-DD'); // 5 days ago from today

        const result = await pool.query(GET_MAINTENANCE_NOTIFICATION_QUERY, [fiveDaysAgo, fiveDaysAgo]);

        return result.rows;
    } catch (error) {
        console.error("Error in getPendingMaintenanceNotifications:", error.message);
        throw error;
    }
};

