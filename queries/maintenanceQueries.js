export const GET_ALL_MAINTENANCE = `
    SELECT * FROM "maintenance_manage";
`;

export const GET_MAINTENANCE_BY_ID = `
    SELECT * FROM "maintenance_manage" WHERE maintenanceid = $1;
`;

export const INSERT_MAINTENANCE = `
    INSERT INTO "maintenance_manage" (
        assetid, issue, resolution_date, cost, vendor, approval_status, comments, request_date
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
    ) RETURNING maintenanceid;
`;

export const UPDATE_MAINTENANCE = `
    UPDATE "maintenance_manage"
    SET 
        assetid = $1, issue = $2, resolution_date = $3, cost = $4,
        vendor = $5, approval_status = $6, comments = $7, request_date = $8
    WHERE maintenanceid = $9;
`;

export const DELETE_MAINTENANCE = `
    DELETE FROM "maintenance_manage" WHERE maintenanceid = $1;
`;
