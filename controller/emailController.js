const nodeMailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

// Function to send an email
const sendEmail = asyncHandler(async (data, req, res) => {
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify SMTP connection
  try {
    await transporter.verify();
  } catch (error) {
    console.error("SMTP connection failed:", error);
    return {
      data: {
        success: false,
        message:
          "Email service is temporarily unavailable. Please try again later.",
      },
      error: null,
    };
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });
  } catch (error) {
    return {
      data: null,
      error: {
        success: false,
        message: "Failed to send email. Please try again later.",
      },
    };
  }
});

module.exports = { sendEmail };
