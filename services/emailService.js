import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use your email provider
    auth: {
        user: process.env.EMAIL_USER,  // Your email (use env variable)
        pass: process.env.EMAIL_PASS   // Your email password (use env variable)
    }
});

// Function to send email
export const sendEmailNotification = async (to, subject, message) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_REP,
            subject,
            text: message
        };

        await transporter.sendMail(mailOptions);
        console.log(`📩 Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
    }
};
