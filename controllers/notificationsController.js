import { getExpiringLicenses, getPendingMaintenanceNotifications } from '../services/notificationsServices.js';
import { sendEmailNotification } from '../services/emailService.js'; // Import email service
import dayjs from 'dayjs';

const ASSET_MANAGER_EMAIL = "hareeshseenu95@gmail.com"; // Replace with the actual email

export const fetchNotifications = async (req, res) => {
    try {
        const today = dayjs();
        const endDate = today.add(30, 'days');

        const licenses = await getExpiringLicenses();
        const notifications = [];

        // Process license expiry notifications
        licenses.forEach(license => {
            const expiryDate = dayjs(license.licenseexpirydate);
            const daysLeft = expiryDate.diff(today, 'day');

            if (expiryDate.isAfter(today) && expiryDate.isBefore(endDate.add(1, 'day'))) {
                const message = `⚠️ Your software license for ${license.softwarename} expires in ${daysLeft} days.`;
                
                notifications.push({ message, daysLeft, expiryDate: expiryDate.format('YYYY-MM-DD') });
            }
        });

        // Send email if there are notifications
        if (notifications.length > 0) {
            const emailContent = notifications.map(n => n.message).join("\n");
            await sendEmailNotification(ASSET_MANAGER_EMAIL, "⚠️ License Expiry Notification", emailContent);
        }

        res.json({ success: true, notifications });
    } catch (error) {
        console.error('❌ Error in fetchNotifications:', error.message);
       return handleError(res, new Error("Error fetching notifications"), 500, "Error fetching notifications");
    }
};

export const fetchMaintenanceNotifications = async (req, res) => {
    try {
        const today = dayjs();
        const notifications = [];

        const maintenanceRecords = await getPendingMaintenanceNotifications();

        maintenanceRecords.forEach(record => {
            const resolutionDate = dayjs(record.resolution_date);
            const requestDate = dayjs(record.request_date);
            const daysAfterResolution = today.diff(resolutionDate, 'days');
            const daysAfterRequest = today.diff(requestDate, 'days');

            if (record.approval_status === 'Pending' && daysAfterResolution > 5) {
                notifications.push({
                    message: `🚨 Maintenance for Asset ${record.assetid} is still not received after ${daysAfterResolution} days.`,
                    assetId: record.assetid,
                    daysAfterResolution,
                });
            }

            if (record.approval_status === 'Requested' && daysAfterRequest > 5) {
                notifications.push({
                    message: `🚨 Asset ${record.assetid} has not been sent for maintenance after ${daysAfterRequest} days from request.`,
                    assetId: record.assetid,
                    daysAfterRequest,
                });
            }
        });

        // Send email if there are maintenance notifications
        if (notifications.length > 0) {
            const emailContent = notifications.map(n => n.message).join("\n");
            await sendEmailNotification(ASSET_MANAGER_EMAIL, "🚨 Maintenance Notifications", emailContent);
        }

        res.json({ success: true, notifications });
    } catch (error) {
        console.error('❌ Error in fetchMaintenanceNotifications:', error.message);
        return handleError(res, new Error("Error in fetching maintenance notifications"), 500, "Error in fetching maintenance notifications");
    }
};
