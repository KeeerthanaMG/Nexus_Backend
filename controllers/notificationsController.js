import { getExpiringLicenses } from '../services/notificationsServices.js';
import { getPendingMaintenanceNotifications } from '../services/notificationsServices.js'; // Import the service to get expiring licenses
import dayjs from 'dayjs'; // Import dayjs for date handling

export const fetchNotifications = async (req, res) => {
    try {
        const today = dayjs(); // Get today's date
        const endDate = today.add(30, 'days'); // Get the date 30 days from today

        // Get licenses expiring in the next 30 days by calling the service
        const licenses = await getExpiringLicenses();

        // Create an array of notifications based on license expiry dates
        const notifications = licenses
            .map(license => {
                // Convert the expiry date from the license into a dayjs object
                const expiryDate = dayjs(license["licenseexpirydate"]);
                
                // Calculate the number of days remaining until expiry
                const daysLeft = expiryDate.diff(today, 'day');

                // Check if the expiry date is within the next 30 days (inclusive)
                if (expiryDate.isAfter(today) && expiryDate.isBefore(endDate.add(1, 'day'))) {
                    return {
                        message: ` Your software license for ${license["softwarename"]}  expires in ${daysLeft} days.`,
                        
                        daysLeft,
                        expiryDate: expiryDate.format('YYYY-MM-DD'),
                    };
                }

                // Return null if the license is not expiring in the next 30 days
                return null;
            })
            .filter(notification => notification !== null); // Filter out the null values

        // Return the notifications as a response to the client
        res.json({ success: true, notifications });

    } catch (error) {
        console.error('❌ Error in fetchNotifications:', error.message);
        return handleError(res, new Error("Error fetching notification"), 500, "Error fetching notification");
    }
}; // Import the service
 // Import dayjs for date handling

export const fetchMaintenanceNotifications = async (req, res) => {
    try {
        const today = dayjs(); // Get today's date
        const notifications = [];

        // Fetch pending maintenance records from the service
        const maintenanceRecords = await getPendingMaintenanceNotifications();

        // Iterate through the fetched maintenance records
        maintenanceRecords.forEach((record) => {
            const resolutionDate = dayjs(record.resolution_date); // Convert resolution date to dayjs object
            const requestDate = dayjs(record.request_date); // Convert request date to dayjs object
            const daysAfterResolution = today.diff(resolutionDate, 'days');
            const daysAfterRequest = today.diff(requestDate, 'days');

            // Notification if the resolution date is passed and status is 'Pending' for more than 5 days
            if (record.approval_status === 'Pending' && daysAfterResolution > 5) {
                notifications.push({
                    message: ` Maintenance for Asset ${record.assetid} is still not received after ${daysAfterResolution} days.`,
                    assetId: record.assetid,
                    daysAfterResolution,
                    resolutionDate: resolutionDate.format('YYYY-MM-DD'),
                });
            }

            // Notification if the approval status is 'Requested' and more than 5 days since the request date
            if (record.approval_status === 'Requested' && daysAfterRequest > 5) {
                notifications.push({
                    message: `Asset ${record.assetid} has not been sent for maintenance after ${daysAfterRequest} days from request.`,
                    assetId: record.assetid,
                    daysAfterRequest,
                    requestDate: requestDate.format('YYYY-MM-DD'),
                });
            }
        });

        // Return the notifications as a response to the client
        res.json({ success: true, notifications });

    } catch (error) {
        console.error('❌ Error in fetchMaintenanceNotifications:', error.message);
        return handleError(res, new Error("Error in fetching maintenance notification"), 500, "Error in fetching maintenance notification");
    }
};

