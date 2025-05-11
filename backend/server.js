import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/user.js";
import commandRouter from "./routes/command.js";
import rateRouter from "./routes/rate.js";
import commentRouter from "./routes/comment.js";
import newsRouter from "./routes/news.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err)); 
 
app.use("/user", router);
app.use("/command", commandRouter);
app.use("/comment", commentRouter);
app.use("/rate", rateRouter);
app.use("/news", newsRouter);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})