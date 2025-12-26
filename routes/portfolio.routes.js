import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
  createProject,
  getProjectsAdmin,
  getPublishedProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
} from "../controllers/portfolio.controller.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getPublishedProjects);
router.get("/:slug", getProjectBySlug);

/* ADMIN */
router.post("/", protect, upload.single("coverImage"), createProject);
router.get("/admin/all", protect, getProjectsAdmin);
router.put("/:id", protect, upload.single("coverImage"), updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
