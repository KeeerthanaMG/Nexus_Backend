// controllers/countController.js
import { getAllRowCounts } from '../services/countServices.js'; // Import service

// Controller function to get the row count
export const fetchRowCount = async (req, res) => {
    try {
        const tableName = req.query.tableName; // Get table name from query parameter
        
        if (tableName) {
            // If a specific table name is provided, fetch count for that table
            const count = await getRowCount(tableName);
            res.json({
                success: true,
                count,
            });
        } else {
            // If no table name is provided, fetch counts for all tables
            const counts = await getAllRowCounts();
            res.json({
                success: true,
                counts,
            });
        }
    } catch (error) {
        console.error('❌ Error fetching row count:', error.message);
        return handleError(res, new Error("Error fetching row count"), 500, "Error fetching row count");
    }
};
