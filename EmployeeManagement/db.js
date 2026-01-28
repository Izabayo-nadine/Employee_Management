//if using postgresql use pg module. install pg.
// const { Pool } = require("pg");

// const pool = new Pool({
//   host: "localhost",
//   user: "postgres",
//   password: "your_password",
//   database: "ne_equipment_db",
//   port: 5432
// });

// pool.connect()
//   .then(() => console.log("PostgreSQL Connected ✅"))
//   .catch(err => console.log("DB Error:", err));

// module.exports = pool;




const mysql=require("mysql2");

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"ne_equipment_db",
    port:3309
})

db.connect((err)=>{
    if(err){
        console.error("Error connecting to database:", err);
    }else{
        console.log("Connected to database");
    }
})

module.exports=db;