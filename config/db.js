import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: './environment/.env' });

const { Pool } = pkg;

// Create a new pool instance
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to PostgreSQL!');
        client.release(); // Release the client back to the pool
    } catch (err) {
        console.error('Error connecting to PostgreSQL:', err.message);
        process.exit(1);
    }
};

// Graceful shutdown
process.on('SIGINT', async () => {
    try {
        await pool.end();
        console.log('Database connection closed.');
    } catch (err) {
        console.error('Error during pool shutdown:', err.message);
    } finally {
        process.exit(0);
    }
}); 

// Export pool instance instead of client
export default { pool, connectDB };
