"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        // 验证token的逻辑
        next();
    }
    else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map