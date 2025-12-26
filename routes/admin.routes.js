import express from "express";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

/* Admin Dashboard */
router.get("/dashboard", protect, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Admin Dashboard",
    adminId: req.admin.id,
  });
});

export default router;
