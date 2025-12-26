require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {Pool} = require("pg");

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
});
app.get("/",(req,res)=>{
    res.send("SupportIQ backend running...");
});

//user registration

app.post("/signup", async(req,res)=>{
    console.log(req.body);
    const {name,username, email,password,role}=req.body;

    try{
        const userNameexists = await pool.query(
            "select * from users where username = $1",[username]
        );
        if (userNameexists.rows.length >0){
            return res.status(400).json({error: "Username already registered !"});
        }
        
        const userEmailexists = await pool.query(
            "select * from users where email = $1",[email]
        );
        if (userEmailexists.rows.length >0){
            return res.status(400).json({error: "Email already registered !"});
        }
    
    const hashPwd = await bcrypt.hash(password,10);

    const insertRes = await pool.query(
        "insert into users (username,email,password,role,name) values ($1,$2,$3,$4,$5) RETURNING id, username, name",
        [username, email, hashPwd, role, name]
    );

    const newUser = insertRes.rows[0];
    // issue token for the newly registered user
    const token = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ message: "User registered successfully !!!", name: newUser.name, username: newUser.username, token });

    }catch(err){
        console.error(err);
        res.status(500).json({error:"Server error"}); 
}
});

app.post("/login", async (req,res)=>{

    const {email,username, password,role}= req.body;
    const identifier = email || username;

    try{
        const userData = await pool.query(
            "select * from users where (email = $1 or username = $1) and role= $2",[identifier,role]
        );
        
        //console.log(userData);
        if  (userData.rows.length ===0){
            return res.status(400).json({error: "User not found"});
        }
        
        // comapre password
        const checkingVal =userData.rows[0].password;

        const pwdmatch = await bcrypt.compare(
            password,checkingVal
        );
        if(!pwdmatch){
            return res.status(400).json({error:"Wrong Password"});
        } 

        //update last seen
        await pool.query(
            "update users set last_seen = NOW() where id =$1",[userData.rows[0].id]
        );

        const token = jwt.sign(
            {userId: userData.rows[0].id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );
        return res.json({message: "Login Successful",
            token,
            username:userData.rows[0].username,
            name: userData.rows[0].name});
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Server error"});
    }
});

// function updateLastSeen(req, res, next) {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return next();

//     const token = authHeader.split(" ")[1];

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         pool.query(
//             "UPDATE users SET last_seen = NOW() WHERE id = $1",
//             [decoded.userId]
//         );

//     } catch (err) {
//         console.log("Invalid token, skipping last_seen update");
//     }

//     next();
// }

const port = 5000;

app.listen(port,()=>{
    console.log(`Server running on port http://localhost:${port} `);
});
 