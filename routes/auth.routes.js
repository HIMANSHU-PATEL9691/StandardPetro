import express from "express";
import { adminLogin } from "../controllers/auth.controller.js";

const router = express.Router();

/* Admin Login */
router.post("/login", adminLogin);

export default router;
