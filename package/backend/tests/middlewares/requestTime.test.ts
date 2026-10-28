import { describe, it, expect, vi } from 'vitest';
import { useRequestTime } from '../../src/middlewares/requestTime';

describe('middlewares/requestTime.ts', () => {
    it('should attach requestTime ISO string to req.params and call next()', () => {
        const req = { params: {} } as any;
        const res = {} as any;
        const next = vi.fn();

        useRequestTime(req, res, next);

        expect(req.params.requestTime).toBeDefined();
        expect(new Date(req.params.requestTime).getTime()).not.toBeNaN();
        expect(next).toHaveBeenCalledTimes(1);
    });
});
