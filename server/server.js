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
    const {username, email,password}=req.body;

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

    await pool.query(
        "insert into users (username,email,password) values ($1,$2,$3)",[username, email, hashPwd]
    );

    res.json({message: "User registered successfully !!!"});

    }catch(err){
        console.error(err);
        res.status(500).json({error:"Server error"});
}
});

app.post("/login", async (req,res)=>{

    const {email,username, password}= req.body;
    const identifier = email || username;

    try{
        const userData = await pool.query(
            "select * from users where email = $1 or username = $1",[identifier]
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

        const token = jwt.sign(
            {userId: userData.rows[0].id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );
        return res.json({message: "Login Successful",
            token,
            username:userData.rows[0].username});
    }catch(err){
        console.error(err);
        res.status(500).json({error:"Server error"});
    }
});

const port = 5000;

app.listen(port,()=>{
    console.log(`Server running on port http://localhost:${port} `);
});
