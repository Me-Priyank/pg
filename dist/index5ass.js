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
async function createStudentTable() {
    try {
        await client.connect();
        console.log("DB connected");
        await client.query(`
        CREATE TABLE IF NOT EXISTS students (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(225) UNIQUE NOT NULL,
            age INT 
        )
    `);
        console.log("Table created");
        const insertData = `
    INSERT INTO students (username, email, age)
    VALUES ($1,$2,$3)
    RETURNING *;
    `;
        const values = [
            ["Priyank Verma", "priyank2311097@akgec.ac.in", 21],
            ["Shivam Goel", "shiva.2311097@akgec.ac.in", 21],
            ["Gand ka baal", "gkb2311097@akgec.ac.in", 21],
            ["Gand ka baal 1", "gkb12311097@akgec.ac.in", 21],
            ["Gand ka baal 2", "gkb22311097@akgec.ac.in", 21]
        ];
        for (const val of values) {
            const res = await client.query(insertData, val);
            console.log(`Inserted: ${res.rows[0].username}`);
        }
        console.log("all values inserted");
    }
    catch (err) {
        console.log(err);
    }
    finally {
        await client.end();
    }
}
createStudentTable();
//# sourceMappingURL=index5ass.js.map