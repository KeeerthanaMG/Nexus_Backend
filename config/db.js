import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Client } = pkg;

const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    port: process.env.DB_PORT || 5432,
    password: process.env.DB_PASSWORD || 'jayakanth',
    database: process.env.DB_NAME || 'asset'
});

// Connect to PostgreSQL
const connectDB = async () => {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL!');
    } catch (err) {
        console.error('Error connecting to PostgreSQL:', err.message);
        process.exit(1);
    }
};

process.on('SIGINT', async () => {
    await client.end();
    console.log('Database connection closed.');
    process.exit(0);
});

// Default export
export default { client, connectDB };
