// routes/team.routes.js
import express from "express";
import multer from "multer";
import path from "path";
import { 
    getTeamMembers, 
    createTeamMember, 
    updateTeamMember, 
    deleteTeamMember 
} from "../controllers/team.controller.js";

const router = express.Router();

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// API Routes
router.get("/", getTeamMembers);
router.post("/", createTeamMember);
router.put("/:id", updateTeamMember);
router.delete("/:id", deleteTeamMember);

// Dedicated Image Upload Route
router.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    // Return the URL for the frontend to save in the team member data
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ file_url: fileUrl });
});

export default router;