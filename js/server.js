const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');  // ✅ Import CORS package
const path = require('path');

const app = express();

// ✅ Enable CORS for all routes
app.use(cors());

// Historical Yield Database
const yieldDbPath = path.join(__dirname, '..', 'database', 'historical_yield.db');
const yieldDb = new sqlite3.Database(yieldDbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Error connecting to historical_yield.db:", err.message);
  } else {
    console.log("Connected to historical_yield.db.");
  }
});

// Farmers Database
const farmersDbPath = path.join(__dirname, '..', 'database', 'farmers_data.db');
const farmersDb = new sqlite3.Database(farmersDbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Error connecting to farmers.db:", err.message);
  } else {
    console.log("Connected to farmers.db.");
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dashboard.html'));
});

// Historical Yield API Endpoint
app.get('/api/data', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const query = "SELECT Date, Yield_kg_per_hectare FROM historical_yield ORDER BY Date DESC";
    yieldDb.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Farmers API Endpoint
// Farmers API Endpoint
app.get('/api/farmers', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const query = "SELECT * FROM farmers";  // Ensure the table name matches your database
    farmersDb.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
