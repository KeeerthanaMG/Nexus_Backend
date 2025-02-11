
export const GET_EXPIRING_LICENSES_QUERY = `
    SELECT "softwarename", "licenseexpirydate"
    FROM softwareassets
    WHERE "licenseexpirydate" BETWEEN $1 AND $2
`;
