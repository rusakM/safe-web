import { describe, it, expect, vi } from 'vitest';
import {
    removeEmojisFromTranslation,
    translationHelper,
    getTranslation,
} from '../../src/services/translationsService';
import { fileService } from '../../src/services';
import { ConstantsGlobal } from '../../src/core/constants';

describe('services/translationsService.ts', () => {
    describe('removeEmojisFromTranslation', () => {
        it('should remove unicode emojis and pictographs from text', () => {
            const textWithEmoji = 'Welcome to SafeWeb 🚀🔒!';
            const cleaned = removeEmojisFromTranslation(textWithEmoji);
            expect(cleaned).toBe('Welcome to SafeWeb !');
        });

        it('should trim surrounding whitespace', () => {
            const padded = '  Clean Text  ';
            expect(removeEmojisFromTranslation(padded)).toBe('Clean Text');
        });
    });

    describe('translationHelper', () => {
        it('should return value when defined and not null', () => {
            expect(translationHelper('Custom Text', 'Fallback')).toBe('Custom Text');
        });

        it('should return fallback when value is undefined or null', () => {
            expect(translationHelper(undefined as any, 'Fallback')).toBe('Fallback');
            expect(translationHelper(null as any, 'Fallback')).toBe('Fallback');
        });
    });

    describe('getTranslation', () => {
        it('should read and parse json file for given language', async () => {
            const mockJson = JSON.stringify({ email: { login: { subject: 'Test' } } });
            vi.spyOn(fileService, 'read').mockResolvedValue(mockJson);

            const result = await getTranslation(ConstantsGlobal.App.USER_INTERFACE_LANGUAGES.en);
            expect(result).toEqual({ email: { login: { subject: 'Test' } } });
        });

        it('should return null if file cannot be read or parsed', async () => {
            vi.spyOn(fileService, 'read').mockRejectedValue(new Error('File not found'));

            const result = await getTranslation(ConstantsGlobal.App.USER_INTERFACE_LANGUAGES.pl);
            expect(result).toBeNull();
        });
    });
});
