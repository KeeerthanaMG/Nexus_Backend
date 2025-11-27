import express from 'express';
import cors from 'cors';
import { config as _config } from 'dotenv';
import db from './config/db.js';
import assetRoutes from './routes/assetRoutes.js';
import softwareRoutes from './routes/softwareRoutes.js';
import userRoutes from './routes/userRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import './cron/cronJobs.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import countRoutes from './routes/countRoutes.js';
import disposalRoutes from './routes/disposalRoutes.js'
//import inoutRoutes from './routes/inoutRoutes.js'
 

_config();  

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());  

db.connectDB().catch((err) => {
    console.error("Database connection failed:", err);
});

app.use('/api/assets', assetRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/count', countRoutes);
app.use("/api", disposalRoutes);
//app.use("/api",inoutRoutes)


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
