import { describe, it, expect } from 'vitest';
import { materialsSagas } from '../../../src/redux/materials/materials.sagas';

describe('Materials Sagas', () => {
    it('materialsSagas should register all watchers with all([...])', () => {
        const generator = materialsSagas();
        const effect = generator.next().value;
        expect(effect).toBeDefined();
        expect((effect as any).type).toBe('ALL');
    });
});
