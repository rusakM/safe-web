import { describe, it, expect } from 'vitest';
import * as globalSchemas from '../../src/models/globalSchemas';

describe('Global Schemas & Validators', () => {
    describe('Fields.File.Simple', () => {
        it('should validate simple file keys and urls', () => {
            const validator = globalSchemas.Fields.File.Simple.mainValidator;
            expect(validator.validate({ key: 'abc', url: 'https://example.com/file.pdf' }).error).toBeUndefined();
            expect(validator.validate({ key: '', url: '' }).error).toBeUndefined();
        });
    });

    describe('Fields.File.Image', () => {
        it('should validate image file with original and thumbnail', () => {
            const validator = globalSchemas.Fields.File.Image.mainValidator;
            const validImage = {
                name: 'test.png',
                type: 'image/png',
                original: { key: 'orig_key', url: 'https://example.com/orig.png' },
                thumbnail: { key: 'thumb_key', url: 'https://example.com/thumb.png' },
            };
            expect(validator.validate(validImage).error).toBeUndefined();
        });
    });

    describe('Options.dbSchema', () => {
        it('should have virtuals, timestamps and strict: false', () => {
            expect(globalSchemas.Options.dbSchema.strict).toBe(false);
            expect(globalSchemas.Options.dbSchema.timestamps).toBe(true);
            expect(globalSchemas.Options.dbSchema.toJSON).toEqual({ virtuals: true });
        });
    });

    describe('Validators.schemaValidator', () => {
        it('should return true for valid and false for invalid input', () => {
            const schema = globalSchemas.Fields.File.Simple.validators.url;
            expect(globalSchemas.Validators.schemaValidator(schema, 'http://test.com')).toBe(true);
            expect(globalSchemas.Validators.schemaValidator(schema, 12345 as any)).toBe(false);
        });
    });
});
