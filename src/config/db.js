const mysql = require("mysql2");

require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((error,connection) => {
    if (error){
        console.error("❌ Error conectando a MySQL:", error);
    } else {
    console.log("✅ Conectado a MySQL");
    connection.release();
  }
});

module.exports = db;