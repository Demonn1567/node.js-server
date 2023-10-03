const express = require('express');
const mysql = require('mysql2/promise');
const cors= require("cors")

const app = express();
const port = 8000;

const dbConfig = {
  host: 'localhost',
  user: 'root', 
  password: 'mysql', 
  database: 'records',
};

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute('SELECT * FROM recs'); 

    connection.end();

    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})