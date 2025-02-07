import db from '../config/db.js';
const { client } = db;
 // Named imports
 // Import default export (the object)
 // Destructure the connectDB from the imported object
// Assuming client is a named export

//function to view more asset details
export async function findAssetById(assetId) {
    const query = `SELECT * FROM public."assetmanage" WHERE assetid = $1`;

    try {
        const result = await client.query(query, [assetId]);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
        console.error('Error executing query', err);
        throw new Error(err.message);
    }
}

//function to add asset
export async function insertAsset(assetData) {
    const query = `
        INSERT INTO public."assetmanage" 
        (assetid, assettype, make, productid, purchasedate, retailer, warrantyexpiry, assigneduserid, 
         location, status, lastcheckoutdate, size, operatingsystem, typeofos, productkey, processor, 
         ram, harddisktype, harddisksize, harddiskmodel, resolution, graphicscardmodel, externaldongledetails, check_in) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, 
                $20, $21, $22, $23, $24)
        RETURNING *;
    `;

    const values = [
        assetData.assetid,
        assetData.assettype,
        assetData.make || null,
        assetData.productid || null,
        assetData.purchasedate || null,
        assetData.retailer || null,
        assetData.warrantyexpiry || null,
        assetData.assigneduserid || null,
        assetData.location || null,
        assetData.status || null,
        assetData.lastcheckoutdate || null,
        assetData.size || null,
        assetData.operatingsystem || null,
        assetData.typeofos || null,
        assetData.productkey || null,
        assetData.processor || null,
        assetData.ram || null,
        assetData.harddisktype || null,
        assetData.harddisksize || null,
        assetData.harddiskmodel || null,
        assetData.resolution || null,
        assetData.graphicscardmodel || null,
        assetData.externaldongledetails || null,
        assetData.check_in || null
    ];

    try {
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error inserting asset:', err);
        throw new Error(err.message);
    }
}

//updateasset
export async function updateAsset(assetId, assetData) {
    const query = `
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
    `;

    const values = [
        assetData.assettype, assetData.make, assetData.productid, assetData.purchasedate, assetData.retailer,
        assetData.warrantyexpiry, assetData.assigneduserid, assetData.location, assetData.status,
        assetData.lastcheckoutdate, assetData.size, assetData.operatingsystem, assetData.typeofos,
        assetData.productkey, assetData.processor, assetData.ram, assetData.harddisktype,
        assetData.harddisksize, assetData.harddiskmodel, assetData.resolution,
        assetData.graphicscardmodel, assetData.externaldongledetails,assetData.check_in , assetId
    ];

    try {
        const result = await client.query(query, values);
        return result.rowCount > 0 ? result.rows[0] : null;
    } catch (err) {
        console.error('Error executing update query', err);
        throw new Error(err.message);
    }
}

//delete asset
export async function deleteAsset(assetId) {
    const query = `DELETE FROM public."assetmanage" WHERE assetid = $1 RETURNING *;`;

    try {
        const result = await client.query(query, [assetId]);
        return result.rowCount > 0 ? result.rows[0] : null;
    } catch (err) {
        console.error('Error executing delete query', err);
        throw new Error(err.message);
    }
}