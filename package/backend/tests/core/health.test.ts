import { describe, it, expect } from 'vitest';

describe('Backend Vitest Setup', () => {
    it('should pass basic math assertion', () => {
        expect(1 + 1).toBe(2);
    });

    it('should define process.env', () => {
        expect(process.env).toBeDefined();
    });
});
