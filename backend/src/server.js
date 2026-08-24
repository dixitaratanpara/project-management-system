import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";


dotenv.config();

const PORT = process.env.PORT || 5000;

//connecte database
connectDB();

app.listen(PORT, "127.0.0.1", () => {
   console.log(`server is running on port ${PORT}`);
});

