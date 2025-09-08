"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const client = new pg_1.Client({
    connectionString: process.env.NEONURL,
});
async function setupDatabase() {
    try {
        await client.connect();
        console.log("Connected to database");
        // Create table if it does not exist
        await client.query(`
            CREATE TABLE IF NOT EXISTS pinku (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(225) UNIQUE NOT NULL,
                password VARCHAR(225) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
            )
        `);
        console.log("Table 'pinku' created or already exists");
        // Insert data into the table
        const insertQuery = `
            INSERT INTO pinku (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = ['Priyank', 'priyank@example.com', 'securepassword123'];
        const result = await client.query(insertQuery, values);
        console.log("Inserted row:", result.rows[0]);
    }
    catch (error) {
        console.error("Database error:", error);
    }
    finally {
        await client.end();
        console.log("Connection closed");
    }
}
setupDatabase();
//# sourceMappingURL=index2.js.map