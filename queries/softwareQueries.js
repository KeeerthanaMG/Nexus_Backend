export const GET_ALL_SOFTWARE = `
    SELECT * FROM softwareassets
`;

export const GET_SOFTWARE_BY_ID = `
    SELECT * FROM softwareassets WHERE softwareid = $1
`;

export const INSERT_SOFTWARE = `
    INSERT INTO softwareassets (
        softwarename, softwareversion, purchasedate, assetid, licensetype,
        licenseexpirydate, assigneduserid, project, userstatus, vendor,
        licensepurchasedate, licensekey, serialnumber, licenseduration,
        licensecost, username, password, expiredstatus, renewaldate,
        renewalcost, comments
    ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20,
        $21
    ) RETURNING softwareid;
`;

export const UPDATE_SOFTWARE = `
    UPDATE softwareassets
SET 
    softwarename = $1, softwareversion = $2, purchasedate = $3, assetid = $4,
    licensetype = $5, licenseexpirydate = $6, assigneduserid = $7, project = $8,
    userstatus = $9, vendor = $10, licensepurchasedate = $11, licensekey = $12,
    serialnumber = $13, licenseduration = $14, licensecost = $15, username = $16,
    password = $17, expiredstatus = $18, renewaldate = $19, renewalcost = $20,
    comments = $21
WHERE softwareid = $22
RETURNING softwareid;
`;

export const DELETE_SOFTWARE = `
    DELETE FROM softwareassets WHERE softwareid = $1 RETURNING softwareid;
`;
