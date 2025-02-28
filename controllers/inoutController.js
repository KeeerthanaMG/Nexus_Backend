/* import { insertInOut, updateInOut, getAllIn, getAllInById } from "../services/inoutServices";
import { handleError, handleSuccess } from "../errorHandler/errorHandler";


// Create InOut record (Check-in)
export const createInOut = async (req, res) => {
    try {
        const { assetid, user_id, check_in, check_out } = req.body;
        
        // Validate required fields
        if (!assetid || !user_id || !check_in || !check_out) {
            return handleError(res, new Error("All fields are required"), 400, "All fields are required");
        }

        // Insert the new InOut record
        const newInOut = await insertInOut(assetid, user_id, check_in, check_out);
        handleSuccess(res, newInOut, 200, "InOut Asset added successfully");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

// Update InOut record (Check-out)
export const changeInOut = async (req, res) => {
    try {
        const { assetid, user_id, check_in, check_out } = req.body;

        // Validate required fields
        if (!assetid || !user_id || !check_in || !check_out) {
            return handleError(res, new Error("All fields are required"), 400, "All fields are required");
        }

        // Update the InOut record for the assetid
        const updatedInOut = await updateInOut(assetid, { user_id, check_in, check_out });
        handleSuccess(res, updatedInOut, 200, "InOut Asset updated successfully");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

// Get all InOut records
export const getAllInOutRecords = async (req, res) => {
    try {
        const allInOut = await getAllIn();
        handleSuccess(res, allInOut, 200, "All InOut records fetched successfully");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

// Get InOut record by assetid
export const getInOutByAssetId = async (req, res) => {
    try {
        const { assetid } = req.params;

        if (!assetid) {
            return handleError(res, new Error("Asset ID is required"), 400, "Asset ID is required");
        }

        const inOutRecord = await getAllInById(assetid);
        if (inOutRecord.length === 0) {
            return handleError(res, new Error("No InOut record found for this Asset ID"), 404, "No record found");
        }

        handleSuccess(res, inOutRecord, 200, "InOut record fetched successfully");
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
 */