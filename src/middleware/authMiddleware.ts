import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (token) {
        // 验证token的逻辑
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT_SECRET is not defined');
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                throw new Error('Invalid token');
            } else {
                req.userId = decoded;
                next(); 
            }
        });

    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};