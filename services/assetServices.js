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
         ram, harddisktype, harddisksize, harddiskmodel, resolution, graphicscardmodel, externaldongledetails) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, 
                $20, $21, $22, $23)
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
        assetData.externaldongledetails || null
    ];

    try {
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error inserting asset:', err);
        throw new Error(err.message);
    }
}