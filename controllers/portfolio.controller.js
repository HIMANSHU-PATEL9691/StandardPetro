import Portfolio from "../models/Portfolio.js";
import slugify from "slugify";

/* ================= CREATE PROJECT ================= */
export const createProject = async (req, res) => {
  const { title, description, category, location, clientName, completionDate, status } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const project = await Portfolio.create({
    title,
    slug: slugify(`${title}-${Date.now()}`, { lower: true }),
    description,
    category,
    location,
    clientName,
    completionDate,
    status,
    coverImage: req.file ? `/uploads/portfolio/${req.file.filename}` : "",
  });

  res.status(201).json(project);
};

/* ================= ADMIN GET ================= */
export const getProjectsAdmin = async (req, res) => {
  const projects = await Portfolio.find().sort({ createdAt: -1 });
  res.json(projects);
};

/* ================= PUBLIC GET ================= */
export const getPublishedProjects = async (req, res) => {
  const projects = await Portfolio.find({ status: "published" }).sort({
    createdAt: -1,
  });
  res.json(projects);
};

/* ================= SINGLE PROJECT ================= */
export const getProjectBySlug = async (req, res) => {
  const project = await Portfolio.findOne({ slug: req.params.slug });
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
};

/* ================= UPDATE ================= */
export const updateProject = async (req, res) => {
  const project = await Portfolio.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });

  project.title = req.body.title || project.title;
  project.slug = slugify(`${project.title}-${Date.now()}`, { lower: true });
  project.description = req.body.description || project.description;
  project.category = req.body.category || project.category;
  project.location = req.body.location || project.location;
  project.clientName = req.body.clientName || project.clientName;
  project.completionDate = req.body.completionDate || project.completionDate;
  project.status = req.body.status || project.status;

  if (req.file) {
    project.coverImage = `/uploads/portfolio/${req.file.filename}`;
  }

  await project.save();
  res.json(project);
};

/* ================= DELETE ================= */
export const deleteProject = async (req, res) => {
  await Portfolio.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};
