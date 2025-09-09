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
    ssl: { rejectUnauthorized: false },
});
async function createTables() {
    try {
        await client.connect();
        console.log("Connected to database");
        // Drop old tables if they exist to avoid conflicts
        await client.query(`DROP TABLE IF EXISTS addresses_new CASCADE`);
        await client.query(`DROP TABLE IF EXISTS users_new CASCADE`);
        // Create users_new table
        await client.query(`
            CREATE TABLE IF NOT EXISTS users_new (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(225) UNIQUE NOT NULL,
                password VARCHAR(225) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);
        // Insert a user
        const insertUserQuery = `
            INSERT INTO users_new (username, email, password)
            VALUES ($1,$2,$3)
            RETURNING *;
        `;
        const userValues = ["tripti", "tingy@gmail.com", "triptihipasswordhai"];
        const userResult = await client.query(insertUserQuery, userValues);
        const userId = userResult.rows[0].id;
        // Create addresses_new table with foreign key reference to users_new
        await client.query(`
            CREATE TABLE IF NOT EXISTS addresses_new (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users_new(id) ON DELETE CASCADE,
                street VARCHAR(100) NOT NULL, 
                city VARCHAR(50) NOT NULL,
                state VARCHAR(50),
                postal_code VARCHAR(20),
                country VARCHAR(50) DEFAULT 'India',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `);
        // Insert an address for the user
        const insertAddressQuery = `
            INSERT INTO addresses_new (user_id, street, city, state, postal_code, country)
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *;
        `;
        const addressValues = [userId, "1ab", "Bulandshahr", "UP", "203001", "India"];
        await client.query(insertAddressQuery, addressValues);
        // Select user with address using JOIN
        const selection = await client.query(`
            SELECT u.username, u.email, a.street, a.city, a.state, a.postal_code, a.country
            FROM users_new u
            JOIN addresses_new a ON u.id = a.user_id
            WHERE u.id = $1;
        `, [userId]);
        console.log("User with address:", selection.rows);
    }
    catch (err) {
        console.error("Error creating tables:", err);
    }
    finally {
        await client.end();
    }
}
createTables();
//# sourceMappingURL=index4.js.map