import emailService from "./emailService";
import jwt from "jsonwebtoken";
import { User } from "../models";

// 定义接口
interface AccountRegisterConfig {
    email: string;
    password: string;
    verifyCode: string;
    verifySession: string;
}

interface AccountLoginConfig {
    email: string;
    password: string;
}

interface AccountLoginResult {
    token: string;
    userId: number; // 假设 userId 是一个数字
}

class AccountService {
    async register(config: AccountRegisterConfig): Promise<boolean> {
        const { email, password, verifyCode, verifySession } = config;

        // 验证验证码
        if (!emailService.verifyCode(verifySession, verifyCode)) {
            throw new Error('验证码错误');
        }

        // 检查用户是否已存在
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('用户已存在');
        }

        // 获取用户总数并创建新用户
        const userId = await this.generateUserId();
        await User.create({ email, password, userId });

        return true;
    }

    async login(email: string, password: string): Promise<AccountLoginResult> {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('用户不存在');
        }

        if (user.password !== password) {
            throw new Error('密码错误');
        }

        const token = this.genJwt({ email, password });

        return {
            token,
            userId: user.userId,
        };
    }

    async verifyToken(token: string): Promise<AccountLoginConfig> {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT_SECRET is not defined');
        }

        try {
            const decoded = jwt.verify(token, secretKey) as AccountLoginConfig;
            return decoded;  
        } catch (error) {
            throw new Error('无效的token');
        }
    }

    private async generateUserId(): Promise<number> {
        const count = await User.count();
        return count + 1000000; // 可以根据您的业务逻辑进行调整
    }

    private genJwt(config: AccountLoginConfig): string {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT_SECRET is not defined');
        }

        return jwt.sign(config, secretKey, { expiresIn: '1h' });
    }
}

export default AccountService;