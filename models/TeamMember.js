// models/TeamMember.js
import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  image: { type: String }, // Stores relative path like "/uploads/123.jpg"
  bio: { type: String },
  expertise: [{ type: String }],
  order: { type: Number, default: 0 }
}, { timestamps: true });

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);
export default TeamMember;