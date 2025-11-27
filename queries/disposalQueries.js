export const INSERT_DISPOSAL = `
    INSERT INTO disposal (assetid, repaired_on, disposaldate, reason, comments)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;
`;
 export const GET_DISPOSAL = `
    SELECT * FROM disposal;
 `


