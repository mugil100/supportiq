const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

const router = express.Router();

// User registration
router.post("/signup", async (req, res) => {
    const { name, username, email, password, role } = req.body;

    try {
        const userNameexists = await pool.query(
            "select * from users where username = $1",
            [username]
        );
        if (userNameexists.rows.length > 0) {
            return res.status(400).json({ error: "Username already registered !" });
        }

        const userEmailexists = await pool.query(
            "select * from users where email = $1",
            [email]
        );
        if (userEmailexists.rows.length > 0) {
            return res.status(400).json({ error: "Email already registered !" });
        }

        const hashPwd = await bcrypt.hash(password, 10);

        const insertRes = await pool.query(
            "insert into users (username,email,password,role,name) values ($1,$2,$3,$4,$5) RETURNING id, username, name,role",
            [username, email, hashPwd, role, name]
        );

        const newUser = insertRes.rows[0];
        // issue token for the newly registered user
        const token = jwt.sign(
            { customer_id: newUser.id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "User registered successfully !!!",
            name: newUser.name,
            username: newUser.username,
            role: newUser.role,
            id: newUser.id,
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// User login
router.post("/login", async (req, res) => {
    const { email, username, password, role } = req.body;
    const identifier = email || username;

    try {
        const userData = await pool.query(
            "select * from users where (email = $1 or username = $1) and role= $2",
            [identifier, role]
        );

        if (userData.rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        // compare password
        const checkingVal = userData.rows[0].password;

        const pwdmatch = await bcrypt.compare(password, checkingVal);
        if (!pwdmatch) {
            return res.status(400).json({ error: "Wrong Password" });
        }

        // update last seen
        await pool.query(
            "update users set last_seen = NOW() where id =$1",
            [userData.rows[0].id]
        );

        const token = jwt.sign(
            {
                customer_id: userData.rows[0].id,
                role: userData.rows[0].role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            message: "Login Successful",
            token,
            username: userData.rows[0].username,
            name: userData.rows[0].name,
            role: userData.rows[0].role,
            id: userData.rows[0].id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
