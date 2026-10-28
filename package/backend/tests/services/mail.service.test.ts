import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as nodemailer from 'nodemailer';
import { Email } from '../../src/services/mail.service';
import { templateService } from '../../src/services';

vi.mock('nodemailer');

describe('services/mail.service.ts', () => {
    const mockSendMail = vi.fn().mockResolvedValue({ messageId: '123' });

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(nodemailer.createTransport).mockReturnValue({
            sendMail: mockSendMail,
        } as any);
    });

    it('should initialize Email with recipient address', () => {
        const user = { email: 'recipient@example.com', firstName: 'Jan' } as any;
        const mailer = new Email(user);
        expect((mailer as any).to).toBe('recipient@example.com');
        expect((mailer as any).firstName).toBe('Jan');
    });

    it('should call nodemailer sendMail with correct parameters', async () => {
        const user = { email: 'recipient@example.com', firstName: 'Jan' } as any;
        const mailer = new Email(user);

        await mailer.send('<p>HTML content</p>', 'Test Subject', 'Text content');

        expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
            to: 'recipient@example.com',
            subject: 'Test Subject',
            html: '<p>HTML content</p>',
            text: 'Text content',
        }));
    });

    it('should render and send verification code template', async () => {
        vi.spyOn(templateService.Login, 'renderLogin').mockResolvedValue(['<p>Code</p>', 'Code', 'Login Code']);

        const user = { email: 'user@example.com' } as any;
        const mailer = new Email(user);

        await mailer.sendVerificationCode('123456');

        expect(templateService.Login.renderLogin).toHaveBeenCalled();
        expect(mockSendMail).toHaveBeenCalledWith(expect.objectContaining({
            subject: 'Login Code',
            html: '<p>Code</p>',
        }));
    });
});
