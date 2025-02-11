
export const GET_EXPIRING_LICENSES_QUERY = `
    SELECT "softwarename", "licenseexpirydate"
    FROM softwareassets
    WHERE "licenseexpirydate" BETWEEN $1 AND $2
`;

export const GET_MAINTENANCE_NOTIFICATION_QUERY=`
            SELECT * 
            FROM maintenance_manage 
            WHERE 
                (approval_status = 'Pending' AND resolution_date < $1)
            OR
                (approval_status = 'Requested' AND request_date < $2)
        `;
