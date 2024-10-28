import express from 'express';
import { sendWelcomeEmail } from '../controllers/user.controller';

const router = express.Router();

router.post('/send-welcome-email', sendWelcomeEmail);

export default router;
