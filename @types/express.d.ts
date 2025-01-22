// @types/express.d.ts
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: User; // 在这里，user 的类型可以根据您的 JWT 解码后的数据结构进行定义
        }
    }
}