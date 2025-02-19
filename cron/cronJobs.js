import cron from 'node-cron';
import { fetchNotifications, fetchMaintenanceNotifications } from '../controllers/notificationsController.js';

console.log("🔄 Scheduled tasks started!");

// Run every day at 9 AM
cron.schedule('0 9 * * *', async () => {
    console.log("🔔 Running daily notification checks...");
    await fetchNotifications();
    await fetchMaintenanceNotifications();
});
