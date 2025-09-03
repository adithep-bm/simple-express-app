const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 4000;

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "username", // แทนที่ด้วยชื่อผู้ใช้ MySQL ของคุณ
  password: "password", // แทนที่ด้วยรหัสผ่าน MySQL ของคุณ
  database: "database_name" // แทนที่ด้วยชื่อฐานข้อมูลที่คุณต้องการเชื่อมต่อ
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Middleware to log request method and URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route handling
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

// ฟังก์ชันบวกเลขสองจำนวน (code smell: ใช้ global variable, ไม่ตรวจสอบชนิดข้อมูล)
// ฟังก์ชันบวกเลขสองจำนวน (code smell: ใช้ global variable, ไม่ตรวจสอบชนิดข้อมูล, unused variable, magic number)
var lastResult = 0; // ใช้ var แทน let/const
var unusedVar = 123; // unused variable
function foo(x, y) { // ชื่อฟังก์ชันไม่สื่อความหมาย
  lastResult = x + y + 42; // magic number
  return lastResult;
}

// API route สำหรับบวกเลข (code smell: hardcode response, ไม่ handle error)
// API route สำหรับบวกเลข (code smell: hardcode response, ไม่ handle error, ไม่ตรวจสอบชนิดข้อมูล)
app.get("/add", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  const result = foo(a, b);
  res.send("ผลรวมคือ " + result + ". Last result: " + lastResult + ". Unused: " + unusedVar);
});