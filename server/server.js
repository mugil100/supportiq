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

const verifyToken = (req,res,next)=>{
    console.log("Auth header:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if(!authHeader)return res.status(401).json({error: "No token"});

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET,(err,decoded)=>{
         console.log("Decoded JWT:", decoded);
        if(err) return res.status(403).json({error: "Invalid Token"});

        req.customer_id = decoded.customer_id;
        req.role = decoded.role;
        next();
    });
};

//user registration

app.post("/signup", async(req,res)=>{

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

    res.json({ message: "User registered successfully !!!", name: newUser.name, username: newUser.username, token });
    res.status(201).json({token});
    
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
            {customer_id: userData.rows[0].id,
                role: userData.rows[0].role
            },
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

// setup multer for image upload
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req,file,cb)=>cb(null,"uploads/"),
    filename: (req,file,cb)=>cb(null,Date.now()+"-"+file.originalname)
});
const upload = multer({storage});

app.post("/raiseticket", verifyToken,upload.single("image"), async(req,res)=>{
    const {title,category,priority,description} = req.body;
    const image = req.file?.filename ||null;
    const customer_id = req.customer_id;
    console.log("File received:", req.file);
    console.log("Headers:", req.headers.authorization);

    try{
        await pool.query(
        `insert into tickets
        (customer_id,title,category,priority,description,image_url)
        values ($1,$2,$3,$4,$5,$6)`,
        [customer_id,title,category,priority,description,image]);
        // creation of new resource ~code 
        res.status(201).json({message : "Ticket raised successfully"});

    }catch(err){
        console.error(err);
        res.status(500).json({error: "Database error"});
    }
});

app.get("/mytickets",verifyToken, async(req,res)=>{
    const customer_id = req.customer_id;

    const result = await pool.query(
        `select ticket_id, title,category,priority,status,created_at
        from tickets
        where customer_id = $1
        order by created_at DESC
        `,[customer_id]
    );
    res.json(result.rows);
});

const port = 5000;

app.listen(port,()=>{
    console.log(`Server running on port http://localhost:${port} `);
});
 