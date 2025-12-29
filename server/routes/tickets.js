const express = require("express");
const pool = require("../config/database");
const { verifyToken } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// Raise a ticket
router.post("/raiseticket", verifyToken, upload.single("image"), async (req, res) => {
    const { title, category, priority, description } = req.body;
    const image = req.file?.filename || null;
    const customer_id = req.customer_id;
    console.log("File received:", req.file);
    console.log("Headers:", req.headers.authorization);

    try {
        await pool.query(
            `insert into tickets
            (customer_id,title,category,priority,description,image_url)
            values ($1,$2,$3,$4,$5,$6)`,
            [customer_id, title, category, priority, description, image]
        );
        res.status(201).json({ message: "Ticket raised successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

// Get user's tickets
router.get("/mytickets", verifyToken, async (req, res) => {
    const customer_id = req.customer_id;

    try {
        const result = await pool.query(
            `select ticket_id, title,category,priority,status,created_at
            from tickets
            where customer_id = $1
            order by created_at DESC`,
            [customer_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
