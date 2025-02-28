export const inoutQueries = {
    insertInOut: `
        INSERT INTO public."in_out" (assetid, user_id, check_in, check_out)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `,
    updateCheckOut: `
        UPDATE public."in_out"
        SET check_in = $1, check_out = $2
        WHERE assetid = $3 AND check_in IS NULL
        RETURNING *;

    `,
    fetchAllInOutRecords: `SELECT * FROM public."in_out"`,
    findInOutByAssetId: `SELECT * FROM public."in_out" WHERE assetid = $1 ORDER BY check_in DESC LIMIT 1`
};

export default inoutQueries;