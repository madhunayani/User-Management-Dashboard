// backend/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../database.js');

// GET all users
router.get("/", (req, res) => {
    const sql = "SELECT * FROM users";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "success", "data": rows });
    });
});

// GET a single user by ID
router.get("/:id", (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "success", "data": row });
    });
});

// POST a new user
router.post("/", (req, res) => {
    const { name, email } = req.body;
    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.run(sql, [name, email], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "success", "data": { id: this.lastID, name, email } });
    });
});

// PUT (update) a user by ID
router.put("/:id", (req, res) => {
    const { name, email } = req.body;
    const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    db.run(sql, [name, email, req.params.id], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "success", "changes": this.changes });
    });
});

// DELETE a user by ID
router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM users WHERE id = ?";
    db.run(sql, [req.params.id], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", "changes": this.changes });
    });
});

module.exports = router;
