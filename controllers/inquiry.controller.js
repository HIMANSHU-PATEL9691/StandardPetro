import Inquiry from "../models/Inquiry.js";

// Admin: Get all inquiries
export const getInquiries = async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.json(inquiries);
};

// Public: Submit a new inquiry
export const createInquiry = async (req, res) => {
  const inquiry = await Inquiry.create(req.body);
  res.status(201).json({ success: true, inquiry });
};

// Admin: Delete an inquiry
export const deleteInquiry = async (req, res) => {
  await Inquiry.findByIdAndDelete(req.params.id);
  res.json({ message: "Inquiry deleted" });
};