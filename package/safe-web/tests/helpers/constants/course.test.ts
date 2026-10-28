import { describe, it, expect } from 'vitest';
import { TYPES_ENUM, PLAYABLE_QUESTION_TYPES, QUESTION_MEDIA_TYPES_ENUM } from '../../../src/helpers/constants/course';

describe('Constants Course', () => {
    it('TYPES_ENUM should contain all question and content types', () => {
        expect(TYPES_ENUM.CONTENT_TEXT).toBe('CONTENT_TEXT');
        expect(TYPES_ENUM.FIT_TILES).toBe('FIT_TILES');
        expect(TYPES_ENUM.MULTI_CHOOSE).toBe('MULTI_CHOOSE');
        expect(TYPES_ENUM.SINGLE_CHOOSE).toBe('SINGLE_CHOOSE');
        expect(TYPES_ENUM.TRUE_FALSE).toBe('TRUE_FALSE');
        expect(TYPES_ENUM.SELECT_CORRECT_ANSWER).toBe('SELECT_CORRECT_ANSWER');
    });

    it('PLAYABLE_QUESTION_TYPES should only include interactive question types', () => {
        expect(PLAYABLE_QUESTION_TYPES).toContain(TYPES_ENUM.FIT_TILES);
        expect(PLAYABLE_QUESTION_TYPES).toContain(TYPES_ENUM.MULTI_CHOOSE);
        expect(PLAYABLE_QUESTION_TYPES).toContain(TYPES_ENUM.SINGLE_CHOOSE);
        expect(PLAYABLE_QUESTION_TYPES).not.toContain(TYPES_ENUM.CONTENT_TEXT);
        expect(PLAYABLE_QUESTION_TYPES).not.toContain(TYPES_ENUM.CONTENT_VIDEO);
    });

    it('QUESTION_MEDIA_TYPES_ENUM should include PHOTO and VIDEO', () => {
        expect(QUESTION_MEDIA_TYPES_ENUM.PHOTO).toBe('PHOTO');
        expect(QUESTION_MEDIA_TYPES_ENUM.VIDEO).toBe('VIDEO');
    });
});
