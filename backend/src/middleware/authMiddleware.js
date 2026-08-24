import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {

        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        //extract token
        const token = authHeader.split(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }


        //store token
        // req.userId = decoded.id;
        req.userId = decoded.id;
        req.userRole = decoded.role;

        next();

    }
    catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });


    }
}
export default authMiddleware;