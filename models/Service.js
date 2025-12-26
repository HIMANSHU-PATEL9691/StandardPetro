import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  short_description: { type: String, required: true },
  full_description: String,
  icon: { type: String, default: 'Building2' },
  features: [String],
  image: String,
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);