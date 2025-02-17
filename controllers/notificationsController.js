import { getExpiringLicenses, getPendingMaintenanceNotifications } from '../services/notificationsServices.js';
import { sendEmailNotification } from '../services/emailService.js'; // Import email service
import dayjs from 'dayjs';
import { handleError } from '../errorHandler/errorHandler.js';

const ASSET_MANAGER_EMAIL = "hareeshseenu95@gmail.com"; // Replace with the actual email

export const fetchNotifications = async (req, res = null) => {
    try {
        const today = dayjs();
        const endDate = today.add(30, 'days');

        const licenses = await getExpiringLicenses();
        const notifications = [];

        licenses.forEach(license => {
            const expiryDate = dayjs(license.licenseexpirydate);
            const daysLeft = expiryDate.diff(today, 'day');

            if (expiryDate.isAfter(today) && expiryDate.isBefore(endDate.add(1, 'day'))) {
                notifications.push({
                    message: `Your software license for ${license.softwarename} expires in ${daysLeft} days.`,
                    daysLeft,
                    expiryDate: expiryDate.format('YYYY-MM-DD'),
                });
            }
        });

        if (notifications.length > 0) {
            const emailContent = notifications.map(n => n.message).join("\n");
            await sendEmailNotification(ASSET_MANAGER_EMAIL, "License Expiry Notification", emailContent);
        }

        // If res exists (API call), send response
        if (res) {
            return res.json({ success: true, notifications });
        }

        // Otherwise, return data for background jobs
        return notifications;
    } catch (error) {
        console.error("Error in fetchNotifications:", error.message);
        
        if (res) {
            return handleError(res, error, 500, "Error fetching notifications");
        }

        throw error; // Re-throw for background jobs
    }
};



export const fetchMaintenanceNotifications = async (req, res = null) => {
    try {
        const today = dayjs();
        const notifications = [];

        const maintenanceRecords = await getPendingMaintenanceNotifications();
        if (!Array.isArray(maintenanceRecords)) {
            throw new Error("getPendingMaintenanceNotifications() did not return an array");
        }

        maintenanceRecords.forEach(record => {
            if (!record || !record.assetid || !record.approval_status) {
                console.warn("Skipping invalid maintenance record:", record);
                return;
            }

            const resolutionDate = dayjs(record.resolution_date);
            const requestDate = dayjs(record.request_date);
            const daysAfterResolution = today.diff(resolutionDate, "days");
            const daysAfterRequest = today.diff(requestDate, "days");

            if (record.approval_status === "Pending" && daysAfterResolution > 5) {
                notifications.push({
                    message: `Maintenance for Asset ${record.assetid} is still not received after ${daysAfterResolution} days.`,
                    assetId: record.assetid,
                    daysAfterResolution,
                });
            }

            if (record.approval_status === "Requested" && daysAfterRequest > 5) {
                notifications.push({
                    message: `Asset ${record.assetid} has not been sent for maintenance after ${daysAfterRequest} days from request.`,
                    assetId: record.assetid,
                    daysAfterRequest,
                });
            }
        });

        if (notifications.length > 0) {
            const emailContent = notifications.map(n => n.message).join("\n");
            await sendEmailNotification(ASSET_MANAGER_EMAIL, "Maintenance Notifications", emailContent);
        }

        // If res exists (API call), send response
        if (res) {
            return res.json({ success: true, notifications });
        }

        // Otherwise, return data for background jobs
        return notifications;
    } catch (error) {
        console.error("Error in fetchMaintenanceNotifications:", error.message);

        if (res) {
            return handleError(res, error, 500, "Error in fetching maintenance notifications");
        }

        throw error; // Re-throw for background jobs
    }
};

