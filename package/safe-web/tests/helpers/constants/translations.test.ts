import { describe, it, expect } from 'vitest';
import { LocalesEnum, ROLES_TRANSLATIONS } from '../../../src/helpers/constants/translations';
import { UserRoleEnum } from '../../../src/types/user';

describe('Constants Translations', () => {
    it('LocalesEnum should contain all 8 project languages', () => {
        expect(Object.values(LocalesEnum)).toEqual([
            'el', 'en', 'fr', 'it', 'pl', 'pt', 'sl', 'sv'
        ]);
    });

    it('ROLES_TRANSLATIONS should map Student and Teacher roles to translation keys', () => {
        expect(ROLES_TRANSLATIONS[UserRoleEnum.STUDENT]).toBe('main.roles.student');
        expect(ROLES_TRANSLATIONS[UserRoleEnum.TEACHER]).toBe('main.roles.teacher');
    });
});
