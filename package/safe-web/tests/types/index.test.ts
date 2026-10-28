import { describe, it, expect } from 'vitest';
import * as allTypes from '../../src/types/index';

describe('types/index exports', () => {
    it('should export componentsTypes, courseTypes, and userTypes namespaces', () => {
        expect(allTypes.componentsTypes).toBeDefined();
        expect(allTypes.courseTypes).toBeDefined();
        expect(allTypes.userTypes).toBeDefined();
        expect(allTypes.userTypes.UserRoleEnum).toBeDefined();
        expect(allTypes.userTypes.UserRoleEnum.STUDENT).toBe('STUDENT');
        expect(allTypes.userTypes.UserRoleEnum.TEACHER).toBe('TEACHER');
    });
});
