import { Request, Response } from 'express';
import { sendEmail } from '../services/email.service';

export const sendWelcomeEmail = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    const mailOptions = {
      from: 'vijju-email@example.com',
      to: email,
      subject: 'Welcome to Our Service!',
      text: `Hi ${name}, welcome to our platform!`,
      html: `<h1>Hi ${name}</h1><p>Welcome to our platform!</p>`,
    };

    await sendEmail(mailOptions);
    res.status(200).send('Welcome email sent successfully!');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
};
