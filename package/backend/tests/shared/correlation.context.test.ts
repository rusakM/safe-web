import { describe, it, expect } from 'vitest';
import { correlationContext } from '../../src/shared/correlation.context';

describe('shared/correlation.context.ts', () => {
    it('should set and get correlationId and userId within context run', () => {
        correlationContext.run(() => {
            correlationContext.setCorrelationId('corr-123');
            correlationContext.setUserId('user-abc');

            expect(correlationContext.getCorrelationId()).toBe('corr-123');
            expect(correlationContext.getUserId()).toBe('user-abc');
            expect(correlationContext.getCorrelationAndUserId()).toEqual({
                correlationId: 'corr-123',
                userId: 'user-abc',
            });
        });
    });

    it('should return N/A when store is not initialized', () => {
        expect(correlationContext.getCorrelationId()).toBe('N/A');
        expect(correlationContext.getUserId()).toBe('N/A');
    });

    it('should generate uuid if correlationId is not passed in withCorrelationId', async () => {
        await correlationContext.withCorrelationId(async () => {
            const corrId = correlationContext.getCorrelationId();
            expect(corrId).toBeDefined();
            expect(corrId).not.toBe('N/A');
            expect(corrId.length).toBeGreaterThan(10);
        });
    });
});
