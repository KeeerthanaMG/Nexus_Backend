import cron from 'node-cron';
import { fetchNotifications, fetchMaintenanceNotifications } from '../controllers/notificationsController.js';

console.log("🔄 Scheduled tasks started!");

// Run every day at 9 AM
cron.schedule('0 9 * * *', async () => {

    try {
        console.log("🔔 Running notification checks...");
        await fetchNotifications(); 
        await fetchMaintenanceNotifications(); 
        console.log("✅ Notifications fetched successfully!");
    } catch (error) {
        console.error("❌ Error in scheduled task:", error.message);
    }
});
