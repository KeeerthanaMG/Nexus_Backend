import express from 'express';
import cors from 'cors';
import { config as _config } from 'dotenv';
import db from './config/db.js';
import assetRoutes from './routes/assetRoutes.js';

_config();  // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());  

// Connect to Database
db.connectDB(); 

// API Routes
app.use('/api/assets', assetRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
