import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "API working",
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});