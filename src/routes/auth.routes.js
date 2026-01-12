import express from "express";
import { login, registerHotel } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/hotel/register", registerHotel);
router.post("/login", login);

export default router;
