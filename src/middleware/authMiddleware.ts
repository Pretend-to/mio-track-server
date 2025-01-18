import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (token) {
        // 验证token的逻辑
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};