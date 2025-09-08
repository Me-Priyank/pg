import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();
const client = new Client({
    connectionString: process.env.NEONURL,
  
})

async function setupDatabase() {
        await client.connect();
        console.log("Connected to database");

        // Create table if it does not exist
        const res = await client.query(`
            SELECT * FROM PINKU
            
        `);
    console.log(res)
}
setupDatabase();
