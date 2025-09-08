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
async function selectFromDatabase(email) {
    try {
        await client.connect();
        const query = 'SELECT * FROM pinku WHERE email = $1';
        const values = [email];
        const res = await client.query(query, values);
        if (res.rows.length > 0) {
            console.log("user found:", res.rows[0]);
            return res.rows[0];
        }
        else {
            console.log("user dont exist");
            return null;
        }
    }
    catch (err) {
        console.log("error encountered:", err);
    }
    finally {
        await client.end();
    }
}
selectFromDatabase("priyank@example.com");
//# sourceMappingURL=index3.js.map