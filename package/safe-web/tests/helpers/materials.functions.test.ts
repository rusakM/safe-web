import { describe, it, expect } from 'vitest';
import { getMaterialUrl, getMaterialPageUrl } from '../../src/helpers/materials.functions';
import { LocalesEnum } from '../../src/helpers/constants/translations';
import type { IMaterial } from '../../src/types/material';

describe('Materials Functions', () => {
    const mockMaterial: IMaterial = {
        _id: 'm1',
        materialNumber: 1,
        names: {
            [LocalesEnum.en]: { name: 'guide_en.pdf', pages: 10 },
            [LocalesEnum.pl]: { name: 'guide_pl.pdf', pages: 10 },
            [LocalesEnum.el]: { name: 'guide_el.pdf', pages: 10 },
            [LocalesEnum.fr]: { name: 'guide_fr.pdf', pages: 10 },
            [LocalesEnum.it]: { name: 'guide_it.pdf', pages: 10 },
            [LocalesEnum.pt]: { name: 'guide_pt.pdf', pages: 10 },
            [LocalesEnum.sl]: { name: 'guide_sl.pdf', pages: 10 },
            [LocalesEnum.sv]: { name: 'guide_sv.pdf', pages: 10 },
        },
        translation: 'guide_trans',
    };

    it('getMaterialUrl should return URL for requested language or fallback to en', () => {
        const plUrl = getMaterialUrl(mockMaterial, LocalesEnum.pl);
        expect(plUrl).toContain('/cdn/materials/guide_pl.pdf');

        const fallbackUrl = getMaterialUrl({ ...mockMaterial, names: { [LocalesEnum.en]: { name: 'guide_en.pdf', pages: 10 } } as any }, LocalesEnum.fr);
        expect(fallbackUrl).toContain('/cdn/materials/guide_en.pdf');
    });

    it('getMaterialPageUrl should format page URL padded to 3 digits', () => {
        const page1Url = getMaterialPageUrl(mockMaterial, LocalesEnum.pl, 1);
        expect(page1Url).toContain('/cdn/materials/pages/1/pl/001.pdf');

        const page15Url = getMaterialPageUrl(mockMaterial, LocalesEnum.en, 15);
        expect(page15Url).toContain('/cdn/materials/pages/1/en/015.pdf');

        const defaultPageUrl = getMaterialPageUrl(mockMaterial, LocalesEnum.pl, 0);
        expect(defaultPageUrl).toContain('/001.pdf');
    });
});
