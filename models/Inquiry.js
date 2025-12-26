import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: String,
  contactNumber: { type: String, required: true },
  whatsappNumber: String,
  product: String,
  message: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Inquiry", inquirySchema);