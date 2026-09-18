const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.getConnection((error, connection) => {
  if (error) {
    console.error("MySQL connection failed:", error.message);
  } else {
    console.log("MySQL database connected");
    connection.release();
  }
});

module.exports = db;