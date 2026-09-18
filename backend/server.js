const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- MIDDLEWARE ----------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://scholargrant-ph.vercel.app",
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- TEST ROUTE ----------
app.get("/", (req, res) => {
  res.json({
    message: "ScholarGrant PH backend is running",
  });
});

// ---------- CREATE APPLICATION ----------
app.post("/api/applications", (req, res) => {
  const { name, nickname, course, reason, password } = req.body;

  console.log(">>> /api/applications hit. Body:", req.body);

  if (!name || !course || !reason || !password) {
    return res.status(400).json({
      message: "Name, course, reason, and password are required.",
    });
  }

  const sql = `
    INSERT INTO applications (name, nickname, course, reason, password)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    name.trim(),
    nickname ? nickname.trim() : null,
    course.trim(),
    reason.trim(),
    password,
  ];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error("Insert error:", error);
      return res.status(500).json({
        message: "Failed to save application.",
        error: error.message,
      });
    }

    res.status(201).json({
      message: "Application saved successfully.",
      applicationId: result.insertId,
    });
  });
});

// ---------- LIST APPLICATIONS ----------
app.get("/api/applications", (req, res) => {
  const sql = `
    SELECT id, name, nickname, course, reason, password, created_at
    FROM applications
    ORDER BY created_at DESC
  `;

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Fetch error:", error.message);
      return res.status(500).json({
        message: "Failed to fetch applications.",
      });
    }
    res.json(results);
  });
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});