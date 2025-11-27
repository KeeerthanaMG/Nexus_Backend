// queries/countQueries.js
export const COUNT_QUERIES = {
    assetmanage: `SELECT COUNT(*) FROM assetmanage`,
    disposal: `SELECT COUNT(*) FROM disposal`,
    softwareassets: `SELECT COUNT(*) FROM softwareassets`,
    in_out: `SELECT COUNT(*) FROM in_out`,
    maintenance_manage: `SELECT COUNT(*) FROM maintenance_manage`,
    userdetails: `SELECT COUNT(*) FROM "Userdetails"`,
    inuse: `SELECT COUNT(*) FROM assetmanage WHERE status='Assigned'`,
    stock:`SELECT COUNT(*) FROM assetmanage WHERE status='inStock'`,
    expiring: `SELECT COUNT(*) FROM softwareassets WHERE licenseexpirydate BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'`,
    expired: `SELECT COUNT(*) FROM softwareassets WHERE expiredstatus='Yes'`
};
