import express from 'express';
import cors from 'cors';
import { config as _config } from 'dotenv';
import db from './config/db.js';
import assetRoutes from './routes/assetRoutes.js';
import softwareRoutes from './routes/softwareRoutes.js';
import userRoutes from './routes/userRoutes.js';
<<<<<<< HEAD
import notificationRoutes from './routes/notificationRoutes.js';


=======
import maintenanceRoutes from './routes/maintenanceRoutes.js';
>>>>>>> 43337b5c9e917f427b0980ad7068aed7229dd0ac

_config();  // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());  

// Connect to Database
db.connectDB().catch((err) => {
    console.error("Database connection failed:", err);
});

// API Routes
app.use('/api/assets', assetRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/users', userRoutes);
<<<<<<< HEAD
app.use('/api/notifications', notificationRoutes);
=======
app.use('/api/maintenance', maintenanceRoutes);
>>>>>>> 43337b5c9e917f427b0980ad7068aed7229dd0ac

// Start Server
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
