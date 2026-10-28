import { describe, it, expect } from 'vitest';
import { Material } from '../../src/models/Material';
import { ConstantsGlobal } from '../../src/core/constants';

describe('Material Model Schema', () => {
    it('should be defined with the expected paths', () => {
        expect(Material).toBeDefined();
        expect(Material.schema.path('materialNumber')).toBeDefined();
        expect(Material.schema.path('translation')).toBeDefined();
    });

    it('should require materialNumber and translation', () => {
        const invalidDoc = new Material({});
        const err = invalidDoc.validateSync();
        expect(err).toBeDefined();
        expect(err?.errors['materialNumber']).toBeDefined();
        expect(err?.errors['translation']).toBeDefined();
    });

    it('should validate a complete material document', () => {
        const names: any = {};
        Object.values(ConstantsGlobal.App.USER_INTERFACE_LANGUAGES).forEach((lang) => {
            names[lang] = { name: `Doc ${lang}`, pages: 5 };
        });

        const doc = new Material({
            materialNumber: 1,
            translation: 'material_1_title',
            names,
        });

        const err = doc.validateSync();
        expect(err).toBeUndefined();
        expect(doc.materialNumber).toBe(1);
        expect(doc.translation).toBe('material_1_title');
    });
});
