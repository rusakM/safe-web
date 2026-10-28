import { describe, it, expect } from 'vitest';
import {
    selectHeaderMenuHidden,
    selectLanguagesMenuHidden,
    selectUserMenuHidden,
} from '../../../src/redux/dropdown-menu/dropdown-menu.selectors';
import type { IStore } from '../../../src/redux/store.types';

describe('DropdownMenu Selectors', () => {
    const mockState: Partial<IStore> = {
        dropdownMenu: {
            headerMenu: { hidden: false },
            languagesMenu: { hidden: true },
            userMenu: { hidden: false },
        },
    };

    it('selectHeaderMenuHidden should return headerMenu.hidden', () => {
        expect(selectHeaderMenuHidden(mockState as IStore)).toBe(false);
    });

    it('selectLanguagesMenuHidden should return languagesMenu.hidden', () => {
        expect(selectLanguagesMenuHidden(mockState as IStore)).toBe(true);
    });

    it('selectUserMenuHidden should return userMenu.hidden', () => {
        expect(selectUserMenuHidden(mockState as IStore)).toBe(false);
    });
});
