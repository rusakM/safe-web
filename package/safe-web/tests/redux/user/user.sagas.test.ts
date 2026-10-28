import { describe, it, expect } from 'vitest';
import { userSagas } from '../../../src/redux/user/user.sagas';

describe('User Sagas', () => {
    it('userSagas should register all watchers with all([...])', () => {
        const generator = userSagas();
        const effect = generator.next().value;
        expect(effect).toBeDefined();
        // Redux-saga all effect has type 'ALL'
        expect((effect as any).type).toBe('ALL');
    });
});
