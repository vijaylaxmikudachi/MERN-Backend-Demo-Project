import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendEmail = async (options: MailOptions): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
