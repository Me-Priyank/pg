"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: 'postgresql://neondb_owner:npg_RkEGYWtf28qc@ep-raspy-poetry-adduw0eb-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
});
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
    `);
}
createUsersTable();
//# sourceMappingURL=index.js.map