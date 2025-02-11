import pkg from 'pg';
import dotenv from 'dotenv';

const { Client } = pkg;
 // This will print all environment variables loaded from the .env file

dotenv.config({ path: './environment/.env' })

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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
