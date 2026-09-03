import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import { emailRegex, passwordRegex } from "../utils/validation.js";

//register user
export const registerUser = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "all felid are required",
            });
        }

        //email validation
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address.",
            });
        }

        //password  validation
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character.",
            });
        }

        //check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user is alredy registred",
            });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user role
        const allowedRoles = ["manager", "member"];

        //add user in database 
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: allowedRoles.includes(role)
                ? role : "member",
        });


        //responce
        const userResopnce = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            // avatar: user.avatar,
            // createAt: user.createAt,
            // updateAt: user.updateAt,
        };

        return res.status(201).json({
            success: true,
            message: "ragistred success",
            user: userResopnce,
        });
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Intaernal server error ",
        });
    }
}

//login user
export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "all felid are required",
            });
        }

        // check user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "wrong email or password",
            });
        }

        //match password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "wrong email or password ",
            });
        }

        //generate token
        const token = jwt.sign({
            id: user._id,
            role: user.role,
        },
            process.env.JWT_SECRET, {
            expiresIn: "7d"
        }
        );


        return res.status(200).json({
            success: true,
            message: "Login success",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                // avatar: user.avatar,
            }
        });
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal  server error ",
        });
    }
}

//get profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//forgot password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        //find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        //generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        console.log(resetToken);

        //save token
        user.resetPasswordToken = resetToken;

        //token expire
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        //reset url
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        const message = `
           <h2>Password Reset Request</h2>

           <p>You requested to reset your password.</p>

           <p>Click the button below to reset your password:</p>

           <a
           href="${resetUrl}"
           style="display:inline-block;
                  padding:12px 20px;
                  background:#2563eb;
                  color:white;
                  text-decoration:none;
                  border-radius:6px;"
            >
              Reset Password
            </a>

            <p>This link will expire in 10 minutes.</p>

            <p>If you did not request this, please ignore this email.</p>
        `;

        await sendEmail(
            email,
            "Reset Your Password",
            message
        );

        return res.status(200).json({
            message: "User found. Next step: Generate reset token.",
        });
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message,
        });
    }
};

//reset password
export const resetPassword = async (req, res) => {
    try {

        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or Expired Token",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //update password
        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return res.status(200).json({
            message: "Password Reset Successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message,
        });
    }
};