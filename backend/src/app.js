import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app= express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/auth",authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/",(req,res)=>{
    res.send("API is working");
});

export default app;