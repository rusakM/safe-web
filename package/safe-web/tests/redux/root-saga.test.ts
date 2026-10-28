import { describe, it, expect } from 'vitest';
import rootSaga from '../../src/redux/root-saga';

describe('Root Saga', () => {
    it('should combine user, materials, and course sagas using all()', () => {
        const generator = rootSaga();
        const effect = generator.next().value;
        expect(effect).toBeDefined();
        expect((effect as any).type).toBe('ALL');
    });
});
