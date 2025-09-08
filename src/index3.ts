import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();
const client = new Client({
    connectionString: process.env.NEONURL,
  
})

async function selectFromDatabase(email:string) {
        try{
            await client.connect();
        const query= 'SELECT * FROM pinku WHERE email = $1';
        const values = [email];
        const res = await client.query(query,values);
        if(res.rows.length>0){
            console.log("user found:", res.rows[0]);
            return res.rows[0];
        }else{
            console.log("user dont exist");
            return null;
        }
        }catch(err){
            console.log("error encountered:",err)
        }finally{
            await client.end();
        }

}
selectFromDatabase("priyank@example.com");
