// routes/countRoutes.js
import express from 'express';
import { fetchRowCount } from '../controllers/countController.js'; // Import the correct controller

const router = express.Router();

// Define a route to get the row count for a table
router.get('/', fetchRowCount); // API endpoint

export default router;
