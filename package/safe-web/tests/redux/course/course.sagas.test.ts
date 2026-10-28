import { describe, it, expect } from 'vitest';
import { courseSagas } from '../../../src/redux/course/course.sagas';

describe('Course Sagas', () => {
    it('courseSagas should register all watchers with all([...])', () => {
        const generator = courseSagas();
        const effect = generator.next().value;
        expect(effect).toBeDefined();
        expect((effect as any).type).toBe('ALL');
    });
});
