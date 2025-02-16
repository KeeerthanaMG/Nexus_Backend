// queries/countQueries.js
export const COUNT_QUERIES = {
    assetmanage: `SELECT COUNT(*) FROM assetmanage`,
    disposal: `SELECT COUNT(*) FROM disposal`,
    softwareassets: `SELECT COUNT(*) FROM softwareassets`,
    in_out: `SELECT COUNT(*) FROM in_out`,
    maintenance_manage: `SELECT COUNT(*) FROM maintenance_manage`,
    userdetails: `SELECT COUNT(*) FROM "Userdetails"`,
    inuse: `SELECT COUNT(*) FROM assetmanage WHERE status='Assigned'`
};
