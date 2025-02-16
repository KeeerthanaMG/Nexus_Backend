// assetQueries.js
const queries = {
    findAssetById: `SELECT * FROM public."assetmanage" WHERE assetid = $1`,
    insertAsset: `
        INSERT INTO public."assetmanage" 
        (assetid, assettype, make, productid, purchasedate, retailer, warrantyexpiry, assigneduserid, 
         location, status, lastcheckoutdate, size, operatingsystem, typeofos, productkey, processor, 
         ram, harddisktype, harddisksize, harddiskmodel, resolution, graphicscardmodel, externaldongledetails, check_in) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, 
                $20, $21, $22, $23, $24)
        RETURNING *;
    `,

    request:`SELECT request_id FROM in_out ORDER BY request_id DESC LIMIT 1`,

    insertInOut:` 
        INSERT INTO public.in_out (request_id, assetid, user_id, check_out, check_in)
        VALUES ($1, $2, $3, $4, $5)
                `,
    updateAsset: `
        UPDATE public."assetmanage"
        SET 
            assettype = COALESCE($1, assettype),
            make = COALESCE($2, make),
            productid = COALESCE($3, productid),
            purchasedate = COALESCE($4, purchasedate),
            retailer = COALESCE($5, retailer),
            warrantyexpiry = COALESCE($6, warrantyexpiry),
            assigneduserid = COALESCE($7, assigneduserid),
            location = COALESCE($8, location),
            status = COALESCE($9, status),
            lastcheckoutdate = COALESCE($10, lastcheckoutdate),
            size = COALESCE($11, size),
            operatingsystem = COALESCE($12, operatingsystem),
            typeofos = COALESCE($13, typeofos),
            productkey = COALESCE($14, productkey),
            processor = COALESCE($15, processor),
            ram = COALESCE($16, ram),
            harddisktype = COALESCE($17, harddisktype),
            harddisksize = COALESCE($18, harddisksize),
            harddiskmodel = COALESCE($19, harddiskmodel),
            resolution = COALESCE($20, resolution),
            graphicscardmodel = COALESCE($21, graphicscardmodel),
            externaldongledetails = COALESCE($22, externaldongledetails),
            check_in = COALESCE($23, check_in)
        WHERE assetid = $24
        RETURNING *;
    `,
    deleteAsset: `DELETE FROM public."assetmanage" WHERE assetid = $1 RETURNING *;`,
    fetchAll: `SELECT * FROM public."assetmanage";`,
};

export default queries;
