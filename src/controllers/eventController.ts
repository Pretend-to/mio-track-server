import { Request, Response } from 'express';
import EventService from '../services/eventService';

export class EventController {
    async logEvent(req: Request, res: Response) {
        const eventData = req.body;
        try {
            const event = await EventService.createEvent(eventData);
            res.status(201).json(event);
        } catch (error: unknown) { // 将 error 的类型声明为 unknown
            if (error instanceof Error) { // 检查 error 是否是 Error 的实例
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }
}

export default new EventController();