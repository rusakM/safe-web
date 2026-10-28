import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { getCurrentLocale, formatNewLines, parseBoldTags } from '../../src/translations/utils';
import { LocalesEnum } from '../../src/helpers/constants/translations';

describe('Translations Utils', () => {
    it('getCurrentLocale should return stored locale or default to en', () => {
        localStorage.removeItem('locale');
        expect(getCurrentLocale()).toBe(LocalesEnum.en);

        localStorage.setItem('locale', LocalesEnum.pl);
        expect(getCurrentLocale()).toBe(LocalesEnum.pl);
        localStorage.removeItem('locale');
    });

    it('formatNewLines should split text by <br> into fragments with br tags', () => {
        const { container } = render(formatNewLines('Line1<br>Line2'));
        expect(container.querySelectorAll('br')).toHaveLength(2);
        expect(container).toHaveTextContent('Line1Line2');
    });

    it('parseBoldTags should convert <b> tags into strong elements', () => {
        const { container } = render(parseBoldTags('This is <b>bold</b> text', 'highlight'));
        const strong = container.querySelector('strong');
        expect(strong).toBeInTheDocument();
        expect(strong).toHaveTextContent('bold');
        expect(strong).toHaveClass('highlight');
    });
});
