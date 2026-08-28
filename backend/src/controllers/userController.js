import User from "../models/User.js";

//get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("name email role")
      .sort({ name: 1 });

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};