import { describe, it, expect, vi } from 'vitest';
import { Register, Login } from '../../src/services/template.service';
import { translationsService } from '../../src/services';
import { ConstantsGlobal } from '../../src/core/constants';

describe('services/template.service.ts', () => {
    it('should return rendered register email tuple [html, text, subject]', async () => {
        vi.spyOn(translationsService, 'getTranslation').mockResolvedValue({
            email: {
                registration: {
                    subject: 'Welcome to SafeWeb',
                },
            },
        } as any);

        const result = await Register.renderRegister(ConstantsGlobal.App.USER_INTERFACE_LANGUAGES.en, '123456');

        expect(result).toHaveLength(3);
        expect(result[2]).toBe('Welcome to SafeWeb');
    });

    it('should return rendered login email tuple [html, text, subject]', async () => {
        vi.spyOn(translationsService, 'getTranslation').mockResolvedValue({
            email: {
                login: {
                    subject: 'Your SafeWeb verification code',
                },
            },
        } as any);

        const result = await Login.renderLogin(ConstantsGlobal.App.USER_INTERFACE_LANGUAGES.en, '654321');

        expect(result).toHaveLength(3);
        expect(result[2]).toBe('Your SafeWeb verification code');
    });
});
