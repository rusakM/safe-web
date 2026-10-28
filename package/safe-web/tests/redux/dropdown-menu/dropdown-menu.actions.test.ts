import { describe, it, expect } from 'vitest';
import * as actions from '../../../src/redux/dropdown-menu/dropdown-menu.actions';
import DropdownMenuTypes from '../../../src/redux/dropdown-menu/dropdown-menu.types';

describe('DropdownMenu Actions', () => {
    it('hideAll should build HIDE_ALL action', () => {
        expect(actions.hideAll()).toEqual({
            type: DropdownMenuTypes.HIDE_ALL,
        });
    });

    it('toggle actions should build respective toggle actions', () => {
        expect(actions.toggleHeaderMenuHidden()).toEqual({
            type: DropdownMenuTypes.TOGGLE_HEADER_MENU_HIDDEN,
        });
        expect(actions.toggleLanguagesMenuHidden()).toEqual({
            type: DropdownMenuTypes.TOGGLE_LANGUAGES_MENU_HIDDEN,
        });
        expect(actions.toggleUserMenuHidden()).toEqual({
            type: DropdownMenuTypes.TOGGLE_USER_MENU_HIDDEN,
        });
    });
});
