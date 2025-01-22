import nodemailer from 'nodemailer';

interface EmailHandlerConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    secure?: boolean; // 可选，默认为 false
}



class EmailHandler {
    private transporter: nodemailer.Transporter;
    private config: EmailHandlerConfig;

    constructor(config: EmailHandlerConfig) {
        this.config = config;
        this.transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure || false, // 默认情况下为 false，除非是 465 端口
            auth: {
                user: config.username,
                pass: config.password,
            },
        });
    }

    async sendEmail(to: string, subject: string, text?: string, html?: string): Promise<void> {
        const mailOptions = {
            from: this.config.username,
            to,
            subject,
            text,
            html,
        };
        
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
        } catch (error) {
            console.error('Error occurred while sending email:', error);
            throw new Error('Failed to send email');
        }
    }
}

// 从环境变量中获取配置
const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_SSL,
} = process.env;

// 检查必需的环境变量是否已定义
if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
    throw new Error('PlAease define all required environment variables: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS');
}

const emailConfig: EmailHandlerConfig = {
    host: EMAIL_HOST,
    port: parseInt(EMAIL_PORT, 10), // 使用解析后的数字
    username: EMAIL_USER,
    password: EMAIL_PASS,
    secure: EMAIL_SSL === 'true',
}

export default new EmailHandler(emailConfig);