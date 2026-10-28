import { describe, it, expect } from 'vitest';
import DropdownMenuTypes from '../../../src/redux/dropdown-menu/dropdown-menu.types';

describe('DropdownMenu Types', () => {
    it('should define all menu action types', () => {
        expect(DropdownMenuTypes.HIDE_ALL).toBe('HIDE_ALL');
        expect(DropdownMenuTypes.TOGGLE_HEADER_MENU_HIDDEN).toBe('TOGGLE_HEADER_MENU_HIDDEN');
        expect(DropdownMenuTypes.TOGGLE_LANGUAGES_MENU_HIDDEN).toBe('TOGGLE_LANGUAGES_MENU_HIDDEN');
        expect(DropdownMenuTypes.TOGGLE_USER_MENU_HIDDEN).toBe('TOGGLE_USER_MENU_HIDDEN');
    });
});
