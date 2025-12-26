import express from "express";
import protect from "../middleware/auth.middleware.js";
import { getInquiries, createInquiry, deleteInquiry } from "../controllers/inquiry.controller.js";

const router = express.Router();

router.post("/", createInquiry); // Public submission
router.get("/", protect, getInquiries); // Admin only
router.delete("/:id", protect, deleteInquiry); // Admin only

export default router;