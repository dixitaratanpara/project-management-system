import jwt from "jsonwebtoken";

const authMiddleware = async(req,res,next)=>{
    try{

        // Get token from Authorization header
        const authHeader= req.header.authorization;

        if(!authHeader || !authHeader.startwith("Bearer")){
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        //extract token
        const token = authHeader.split(" ")[1];

        //verify token
        const decoded= jwt.verify(token,process.env.JWT_SECRET);

        //store token
        req.userId= decoded.id;

        next();

    }
    catch(error){

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });


    }
}