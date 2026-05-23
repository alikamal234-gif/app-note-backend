import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import noteRoutes from "./routes/noteRoutes.js";


dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://web-rho-jade-96.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use("/api/notes", noteRoutes);
app.use("/api/auth",authRoutes)
app.get("/", (req, res) => {
    res.json({
        message: "API working",
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});