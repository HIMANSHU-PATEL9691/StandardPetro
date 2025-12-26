import Admin from "../models/Admin.js";
import { generateToken } from "../config/jwt.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  const admin = await Admin.findOne({ email });

  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    success: true,
    admin: {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    },
    token: generateToken(admin._id),
  });
};
