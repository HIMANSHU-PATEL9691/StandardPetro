import multer from "multer";
import fs from "fs";
import path from "path";

/* ===== DYNAMIC STORAGE ===== */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    let folder = "uploads/common";

    // Route-based folder selection
    if (req.baseUrl.includes("blogs")) {
      folder = "uploads/blogs";
    } else if (req.baseUrl.includes("portfolio")) {
      folder = "uploads/portfolio";
    } else if (req.baseUrl.includes("services")) {
      folder = "uploads/services";
    } else if (req.baseUrl.includes("team")) {
      folder = "uploads/team";
    }

    // Ensure the directory exists
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },

  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;