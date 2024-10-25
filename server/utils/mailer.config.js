import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config()

// Create the transporter object using the environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL_ID,    // Should be your Gmail email
    pass: process.env.GMAIL_PASSWORD,    // App password or actual password (if less secure apps are enabled)
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.log("Error with email configuration:", error.message);
  } else {
    console.log("Email server is ready to send messages");
  }
});

export default transporter;
