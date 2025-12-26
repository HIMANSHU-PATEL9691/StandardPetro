import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    company_name,
    contact_person,
    email,
    phone,
    whatsapp,
    business_type,
    location,
    area_of_operation,
    experience_years,
    annual_turnover,
    interested_products,
    message,
  } = req.body;

  // ✅ Basic validation
  if (!company_name || !contact_person || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: "Required fields missing",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Standard Petro Website" <${process.env.EMAIL_USER}>`,
      to: "standardpetro.in@gmail.com",
      replyTo: email,
      subject: `🤝 New Channel Partner Application - ${company_name}`,
      html: `
        <div style="font-family:Arial;line-height:1.6">
          <h2 style="color:#f97316;">New Channel Partner Application</h2>

          <p><b>Company / Individual:</b> ${company_name}</p>
          <p><b>Contact Person:</b> ${contact_person}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>WhatsApp:</b> ${whatsapp || "N/A"}</p>
          <p><b>Business Type:</b> ${business_type || "N/A"}</p>
          <p><b>Location:</b> ${location || "N/A"}</p>
          <p><b>Area of Operation:</b> ${area_of_operation || "N/A"}</p>
          <p><b>Experience:</b> ${experience_years || 0} years</p>
          <p><b>Annual Turnover:</b> ${annual_turnover || "N/A"}</p>

          <p><b>Interested Products:</b><br/>
            ${(interested_products || []).join(", ")}
          </p>

          <p><b>Message:</b><br/>${message || "N/A"}</p>

          <hr/>
          <p style="font-size:12px;color:#666">
            Sent from Channel Partner Form – Standard Petro
          </p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Partner application sent successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send partner application",
    });
  }
});

export default router;
