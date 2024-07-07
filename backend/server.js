
// Importing required modules
const mysql = require('mysql'); 
const bodyParser = require('body-parser'); // Parse incoming request bodies
const cors = require('cors'); // Enable Cross-Origin Resource Sharing
const express = require('express'); // Fast, unopinionated, minimalist web framework for Node.js

const app = express(); // Create an instance of the express application
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all routes



//connection to MySql
const db = mysql.createConnection({
  host: "sql11.freesqldatabase.com",
  user:"sql11685557",
  password:"fGx7EwCt5i",
  database:'sql11685557',
})

app.get('/',(re,res)=>{
  return res.json("from server side");
})

//some example to get all users from user table at database
app.get('/users', (re,res)=>{
  const sql = "SELECT * FROM USERS";
  db.query(sql, (err,data)=>{
    if(err) return res.json(err);
    return res.json(data);
  })
})
// Start the server
const PORT = 6500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
