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
    await client.connect();
    console.log("Connected to database");
    // Create table if it does not exist
    const res = await client.query(`
            SELECT * FROM PINKU
            
        `);
    console.log(res);
}
setupDatabase();
//# sourceMappingURL=index3.js.map