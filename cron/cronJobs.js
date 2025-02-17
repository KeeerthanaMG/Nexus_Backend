import cron from 'node-cron';
import { fetchNotifications, fetchMaintenanceNotifications } from '../controllers/notificationsController.js';

console.log("🔄 Scheduled tasks started!");

// Run every day at 9 AM
cron.schedule('* * * * *', async () => {
    try {
        console.log("🔔 Running notification checks...");
        await fetchNotifications(); // License expiry notifications
        await fetchMaintenanceNotifications(); // Maintenance notifications
        console.log("✅ Notifications fetched successfully!");
    } catch (error) {
        console.error("❌ Error in scheduled task:", error.message);
    }
});
