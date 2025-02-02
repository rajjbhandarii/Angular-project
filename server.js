const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("./data.db");

// Middleware
app.use(bodyParser.json());

// Enable CORS (Only allow frontend requests from your domain)
 app.use(cors({
  origin: "https://coder.great-site.net",
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));

// Create a table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    description TEXT,
    amount INTEGER,
    category TEXT
  )
`);

// Add data to the database
app.post("/api/data", (req, res) => {
  const { date, description, amount, category } = req.body;
  db.run(
    "INSERT INTO data (date,description,amount,category) VALUES (?, ?, ?, ? )",
    [date, description, amount, category],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

// Get all data
app.get("/api/data", (req, res) => {
  db.all("SELECT * FROM data", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Remove data from database
app.delete("/api/data/:id", (req, res) => {
  db.run(`DELETE FROM data WHERE id = ?`, req.params.id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ changes: this.changes });
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;  // Use environment port if available
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
