import nodemailer from "nodemailer";
// Create the transporter using the SMTP service (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail", // You can replace this with another email service if needed
  auth: {
    user: process.env.EMAIL_USER, // Your email (from .env file)
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password (from .env file)
  },
});

// Function to send an email notification
const sendEmailNotification = async (recipient, subject, message) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: recipient, // Recipient's email address
      subject: subject, // Subject of the email
      text: message, // Email content (plain text)
    };

    const info = await transporter.sendMail(mailOptions); // Send email
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmailNotification;
