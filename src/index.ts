import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();
const client = new Client({
    connectionString: process.env.NEONURL,
  
})


// function to create a users table in your db

async function createUsersTable() {
    await client.connect();

    const result = await client.query(`
        CREATE TABLE pinku (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(225) UNIQUE NOT NULL,
            password VARCHAR(225) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
        )
    `)
}

createUsersTable();