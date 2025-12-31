const express = require("express");
const pool = require("../config/database");
const {verifyToken} = require("../middleware/auth");
const router = express.Router();

// get all tickets assigned to the agent
router.get("/agent/home",verifyToken, async(req,res)=>{
    if(req.role!== "agent")
        return res.status(403).json({error:"Access denied"});

    const result = await pool.query(
        `select ticket_id,title,priority,status,created_at
         from tickets
        where assigned_agent_id is NULL`
    );
    res.json(result.rows);
});

//getting the stats of the agent

router.get("/agent/stats", verifyToken, async(req,res)=>{
    if(req.role !== "agent")
        return res.status(403).json({error:"Access denied"});

    const agentid = req.customer_id;

    const assigned = await pool.query(
        `select count(*) from tickets
        where assigned_agent_id = $1`,[agentid]
    );
    const inProgress = await pool.query(
        `select count(*) from tickets
        where assigned_agent_id = $1 and status ='In Progress'`,[agentid]
    );
    const unreplied = await pool.query(
        `select count(distinct t.ticket_id) from tickets t
        where t.assigned_agent_id = $1 and m.sender_type='Customer'`,[agentid]
    );
    const resolved = await pool.query(
        `select count(*) from tickets
        where assigned_agent_id = $1 and status = 'Closed'
        and date(updated_at)=CURRENT_DATE`,[agentid]
    );

    res.json({
        assigned: assigned.rows[0].count,
        inProgress: inProgress.rows[0].count,
        unreplied: unreplied.rows[0].count,
        resolved: resolved.rows[0].count,
    });
});