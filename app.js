import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import authRoutes from "./routes/auth.routes.js";
import hotelRoutes from "./routes/hotel.routes.js";
import businessRoutes from "./routes/business.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/hotels", hotelRoutes);
app.use("/api/v1/business", businessRoutes);
app.use("/api/v1/guest", guestRoutes);
app.use("/api/v1/messages", messageRoutes);

export default app;
