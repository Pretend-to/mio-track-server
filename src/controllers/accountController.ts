import { Request, Response } from 'express';
import EmailService from '../services/emailService';

export class EmailController {

    async register(req: Request, res: Response) {
        const { email } = req.body; 
        try {
            const sessionId = await EmailService.register(email);
            res.status(200).json({ sessionId }); 
        } catch (error) {
            res.status(500).json({ error: 'Failed to register' }); 
        }
    }
}

export default new EmailController();