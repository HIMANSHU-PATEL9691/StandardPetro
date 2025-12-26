import nodemailer from "nodemailer";

export const sendCareerMail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // SSL
    auth: {
      user: process.env.MAIL_USER, // career@standardpetro.in
      pass: process.env.MAIL_PASS, // email password
    },
  });

  // ✅ SAFE FALLBACKS (IMPORTANT)
  const safe = (value, fallback = "N/A") =>
    value && String(value).trim() ? value : fallback;

  const mailOptions = {
    from: `"Standard Petro Careers" <${process.env.MAIL_USER}>`,
    to: "standardpetro.in@gmail.com",
    replyTo: data.email,
    subject: `New Job Application – ${safe(data.position, "Position")}`,
    html: `
      <div style="font-family:Arial, sans-serif; line-height:1.6;">
        <h2 style="color:#f59e0b;">New Job Application Received</h2>

        <table cellpadding="6" cellspacing="0">
          <tr><td><strong>Name:</strong></td><td>${safe(data.full_name)}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${safe(data.email)}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${safe(data.phone)}</td></tr>
          <tr><td><strong>Position:</strong></td><td>${safe(data.position)}</td></tr>
          <tr><td><strong>Location:</strong></td><td>${safe(data.location, "Not specified")}</td></tr>
          <tr><td><strong>Experience:</strong></td><td>${safe(data.experience_years, "0")} years</td></tr>
          <tr><td><strong>Current Company:</strong></td><td>${safe(data.current_company)}</td></tr>
        </table>

        <p>
          <strong>Resume:</strong>
          ${
            data.resume_url && data.resume_url.trim()
              ? `<a href="${data.resume_url}" target="_blank">View Resume</a>`
              : "Not uploaded"
          }
        </p>

        <p><strong>Cover Letter:</strong></p>
        <p style="white-space:pre-line;">
          ${safe(data.cover_letter, "No cover letter provided")}
        </p>

        <hr />
        <p style="font-size:12px;color:#666;">
          This email was sent from the <strong>Standard Petro Careers</strong> portal.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
