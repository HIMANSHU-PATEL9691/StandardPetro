// routes/service.routes.js
import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
  createService,
  getServices,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getServices);

/* ADMIN */
router.post("/", protect, upload.single("image"), createService);
router.put("/:id", protect, upload.single("image"), updateService);
router.delete("/:id", protect, deleteService);

export default router;