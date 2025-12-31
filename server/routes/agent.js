const express = require("express");
const pool = require("../config/database");
const {verifyToken} = require("../middleware/auth");
const router = express.Router();

router("/ahome",verifyToken, async(req,res)=>{
    if(req.role!== "agent")
        return res.status(403).json({error:"Access denied"});

    const result = await pool.query(
        `select ticket_id,title,priority,status,created_at
         from tickets
        where assigned_agent_id is NULL`
    );
    res.json(result.rows);
});