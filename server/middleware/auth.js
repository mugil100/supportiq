const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log("Auth header:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: "No token" });

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log("Decoded JWT:", decoded);
        if (err) return res.status(403).json({ error: "Invalid Token" });

        req.customer_id = decoded.customer_id;
        req.role = decoded.role;
        next();
    });
};

module.exports = { verifyToken };
