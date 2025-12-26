import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
  createBlog,
  getBlogsAdmin,
  getPublishedBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

/* PUBLIC */
router.get("/", getPublishedBlogs);
router.get("/:slug", getBlogBySlug);

/* ADMIN */
router.post("/", protect, upload.single("image"), createBlog);
router.get("/admin/all", protect, getBlogsAdmin);
router.put("/:id", protect, upload.single("image"), updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
