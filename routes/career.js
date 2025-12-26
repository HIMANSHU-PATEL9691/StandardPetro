import express from "express";
import multer from "multer";
import { sendCareerMail } from "../utils/mailer.js";

const router = express.Router();
const upload = multer({ dest: "uploads/resumes" });

router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const resume_url = req.file
      ? `${process.env.BASE_URL}/uploads/resumes/${req.file.filename}`
      : "";

    await sendCareerMail({
      ...req.body,
      resume_url,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

export default router;
