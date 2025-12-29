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

// get single ticket details
router.get("/ticket/:id", verifyToken, async(req,res)=>{
    const {id} = req.params;
    const customer_id = req.customer_id;

    const ticket = await pool.query(
        `select * from tickets 
        where ticket_id = $1 and customer_id=$2`,
        [id, customer_id]
    );

    if (tickets.rows[0].length===0){
        return res.status(404).json({error:"Ticket not found"});
    }
    res.json(ticket.rows[0]);
});

//fetch chat history
router.get("/ticket/:id/message", verifyToken, async(req,res)=>{
    const {id} = req.params;
    const {message} = req.body;

    await pool.query(
        `insert into ticket_messages (ticket_id, sender_type,sender_id,message)
        values ($1,'Customer',$2,$3)
        `, [id, req.customer_id,meaasge]
    );
    res.status(201).json({message: "Sent"});
});

module.exports = router;
