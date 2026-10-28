import { describe, it, expect } from 'vitest';
import { LocalesEnum } from '../../src/helpers/constants/translations';
import type { IMaterial } from '../../src/types/material';

describe('material types contracts', () => {
    it('should validate IMaterial shape across all supported locales', () => {
        const material: IMaterial = {
            _id: 'mat-1',
            materialNumber: 1,
            names: {
                [LocalesEnum.en]: { name: 'handbook-en.pdf', pages: 10 },
                [LocalesEnum.pl]: { name: 'handbook-pl.pdf', pages: 10 },
                [LocalesEnum.el]: { name: 'handbook-el.pdf', pages: 10 },
                [LocalesEnum.fr]: { name: 'handbook-fr.pdf', pages: 10 },
                [LocalesEnum.it]: { name: 'handbook-it.pdf', pages: 10 },
                [LocalesEnum.pt]: { name: 'handbook-pt.pdf', pages: 10 },
                [LocalesEnum.sl]: { name: 'handbook-sl.pdf', pages: 10 },
                [LocalesEnum.sv]: { name: 'handbook-sv.pdf', pages: 10 },
            },
            translation: 'handbook.1',
        };

        expect(material.materialNumber).toBe(1);
        expect(material.names[LocalesEnum.pl].name).toBe('handbook-pl.pdf');
        expect(material.names[LocalesEnum.pl].pages).toBe(10);
        expect(material.translation).toBe('handbook.1');
    });
});
