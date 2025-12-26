import Blog from "../models/Blog.js";
import slugify from "slugify";

/* ================= CREATE BLOG ================= */
export const createBlog = async (req, res) => {
  const {
    title,
    excerpt,
    content,
    category,
    author,
    read_time,
    status,
  } = req.body;

  if (!title || !excerpt || !content || !category) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const blog = await Blog.create({
    title,
    slug: slugify(title, { lower: true }),
    excerpt,
    content,
    category,
    author,
    read_time,
    status,
    coverImage: req.file ? `/uploads/blogs/${req.file.filename}` : "",
    createdBy: req.admin.id,
  });

  res.status(201).json(blog);
};

/* ================= GET ALL BLOGS (ADMIN) ================= */
export const getBlogsAdmin = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

/* ================= GET PUBLISHED BLOGS (PUBLIC) ================= */
export const getPublishedBlogs = async (req, res) => {
  const blogs = await Blog.find({ status: "published" }).sort({
    createdAt: -1,
  });
  res.json(blogs);
};

/* ================= GET SINGLE BLOG ================= */
export const getBlogBySlug = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.json(blog);
};

/* ================= UPDATE BLOG ================= */
export const updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  blog.title = req.body.title || blog.title;
  blog.slug = slugify(blog.title, { lower: true });
  blog.excerpt = req.body.excerpt || blog.excerpt;
  blog.content = req.body.content || blog.content;
  blog.category = req.body.category || blog.category;
  blog.author = req.body.author || blog.author;
  blog.read_time = req.body.read_time || blog.read_time;
  blog.status = req.body.status || blog.status;

  if (req.file) {
    blog.coverImage = `/uploads/blogs/${req.file.filename}`;
  }

  await blog.save();
  res.json(blog);
};

/* ================= DELETE BLOG ================= */
export const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  await blog.deleteOne();
  res.json({ message: "Blog deleted successfully" });
};
