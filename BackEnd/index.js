const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const cors = require('cors');

const port = 3000;

const uri = 'mongodb+srv://krishsharma9342:krish1234@cluster0.5upo9nu.mongodb.net/?retryWrites=true&w=majority'; 
const databaseName = 'database1'; 

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/', async (req, res) => {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db(databaseName);
    const collection = db.collection('records'); 

    const documents = await collection.find({}).toArray();

    client.close();

    res.json(documents);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


