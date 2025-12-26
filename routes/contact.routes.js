import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    fullName,
    contactNumber,
    whatsappNumber,
    product,
    message,
  } = req.body;

  // ✅ Validation
  if (!fullName || !contactNumber || !message) {
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
      replyTo: process.env.EMAIL_USER,
      subject: `📩 New Contact Lead - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6">
          <h2 style="color:#f97316;">New Contact Form Submission</h2>
          <p><b>Name:</b> ${fullName}</p>
          <p><b>Contact:</b> ${contactNumber}</p>
          <p><b>WhatsApp:</b> ${whatsappNumber || "N/A"}</p>
          <p><b>Product:</b> ${product || "Not Selected"}</p>
          <p><b>Message:</b><br/>${message}</p>
          <hr/>
          <p style="font-size:12px;color:#666">
            This email was sent from Standard Petro website contact form.
          </p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

export default router;
