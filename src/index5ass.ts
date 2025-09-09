import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();
const client = new Client({
    connectionString: process.env.NEONURL,
  
})



async function createStudentTable() {
    try{
        await client.connect();
    console.log("DB connected")
    await client.query(`
        CREATE TABLE IF NOT EXISTS students (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(225) UNIQUE NOT NULL,
            age INT 
        )
    `)
    console.log("Table created");

    const insertData = `
    INSERT INTO students (username, email, age)
    VALUES ($1,$2,$3)
    RETURNING *;
    `
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
    }catch(err){
        console.log(err)
    }finally{
      await  client.end();
    }
}

createStudentTable();