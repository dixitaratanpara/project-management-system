import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register user
export const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "all felid are required",
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


        //add user in database 
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });


        //responce
        const userResopnce = {
            _id: user._id,
            name: user.name,
            email: user.email,
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
            id: user._id
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
                // role: user.role,
                // avatar: user.avatar,
            }
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