import emailHandler from "./lib/emailHandler";
import fs from "fs";

interface EmailHandler {
    sendEmail(to: string, subject: string, text?: string, html?: string): Promise<void>;
}

class EmailService {
  private handler: EmailHandler;
  private emailTemplates: Record<string, string> = {};
  private sessions: Map<string, string>

  constructor(handler: EmailHandler) {
    this.handler = handler;
    this.emailTemplates = {};
    this.sessions = new Map();
    this.loadEmailTemplates();  
  }
  private loadEmailTemplates() {
    const registerTemplate = fs.readFileSync('./src/services/templates/register.html', 'utf-8');
    this.emailTemplates['register'] = registerTemplate;
    const resetPasswordTemplate = fs.readFileSync('./src/services/templates/reset.html', 'utf-8');
    this.emailTemplates['resetPassword'] = resetPasswordTemplate;
  }

  async register(email: string) {
    const code = this.generateRandomCode(6);
    const sessionId = this.generateRandomCode(16);

    this.sessions.set(sessionId, code);

    const subject = 'Mio-track 注册邮件';
    const html = this.emailTemplates['register']
                    .replace('{{code}}', code)
                    .replace('{{year}}', new Date().getFullYear().toString());
    
    try {
      await this.handler.sendEmail(email, subject, undefined, html);
    } catch (error) {
      console.error('Failed to send registration email:', error);
      throw new Error('Failed to send registration email');
    }

    return sessionId;
  }

  verifyCode(sessionId: string, code: string): boolean {
    const storedCode = this.sessions.get(sessionId);
    if (storedCode && storedCode === code) {
      this.sessions.delete(sessionId);
      return true;
    } else { 
      return false;
    } 
  }

  async resetPassword(email: string) {
    const code = this.generateRandomCode(6);
    const sessionId = this.generateRandomCode(16);

    this.sessions.set(sessionId, code);

    const subject = 'Mio-track 重置密码邮件';
    const html = this.emailTemplates['resetPassword']
                    .replace('{{code}}', code)
                    .replace('{{year}}', new Date().getFullYear().toString());
    try {
      await this.handler.sendEmail(email, subject, undefined, html); 
    } catch (error) {
      console.error('Failed to send reset password email:', error);
      throw new Error('Failed to send reset password email');
    }
  }

  private generateRandomCode(length: number): string {
    const charset = '0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      code += charset[randomIndex];
    }
    return code;
  }
}

export default new EmailService(emailHandler);