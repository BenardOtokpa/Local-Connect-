import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import authRoutes from "./src/routes/auth.routes.js";
import hotelRoutes from "./src/routes/hotel.routes.js";
import businessRoutes from "./src/routes/business.routes.js";
import connectDB from "./src/config/db.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/hotels", hotelRoutes);
// app.use("/api/v1/business", businessRoutes);
// app.use("/api/v1/guest", guestRoutes);
// app.use("/api/v1/messages", messageRoutes);

export default app;
