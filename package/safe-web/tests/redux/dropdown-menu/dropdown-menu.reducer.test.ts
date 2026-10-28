import { describe, it, expect } from 'vitest';
import menuReducer from '../../../src/redux/dropdown-menu/dropdown-menu.reducer';
import DropdownMenuTypes, { type IDropdownMenuStore } from '../../../src/redux/dropdown-menu/dropdown-menu.types';

describe('DropdownMenu Reducer', () => {
    const initialState: IDropdownMenuStore = {
        headerMenu: { hidden: true },
        languagesMenu: { hidden: true },
        userMenu: { hidden: true },
    };

    it('should return initial state for unknown action', () => {
        expect(menuReducer(undefined, { type: 'UNKNOWN' } as any)).toEqual(initialState);
    });

    it('should toggle headerMenu and close others', () => {
        const state = menuReducer(initialState, {
            type: DropdownMenuTypes.TOGGLE_HEADER_MENU_HIDDEN,
        });
        expect(state.headerMenu.hidden).toBe(false);
        expect(state.languagesMenu.hidden).toBe(true);
        expect(state.userMenu.hidden).toBe(true);
    });

    it('should toggle languagesMenu', () => {
        const state = menuReducer(initialState, {
            type: DropdownMenuTypes.TOGGLE_LANGUAGES_MENU_HIDDEN,
        });
        expect(state.languagesMenu.hidden).toBe(false);
        expect(state.headerMenu.hidden).toBe(true);
    });

    it('should toggle userMenu', () => {
        const state = menuReducer(initialState, {
            type: DropdownMenuTypes.TOGGLE_USER_MENU_HIDDEN,
        });
        expect(state.userMenu.hidden).toBe(false);
    });

    it('should reset all menus to hidden on HIDE_ALL', () => {
        const openedState: IDropdownMenuStore = {
            headerMenu: { hidden: false },
            languagesMenu: { hidden: false },
            userMenu: { hidden: false },
        };
        const state = menuReducer(openedState, {
            type: DropdownMenuTypes.HIDE_ALL,
        });
        expect(state).toEqual(initialState);
    });
});
