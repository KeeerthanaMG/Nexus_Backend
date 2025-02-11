import { getExpiringLicenses } from '../services/notificationsServices.js'; // Import the service to get expiring licenses
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
                        message: ` Your software license for ${license["softwarename"]} expires in ${daysLeft} days.`,
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
        res.status(500).json({ success: false, message: 'Error fetching notifications' });
    }
};
