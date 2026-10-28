import { describe, it, expect } from 'vitest';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks';

describe('Redux Hooks', () => {
    it('should export typed useAppDispatch and useAppSelector hooks', () => {
        expect(useAppDispatch).toBeDefined();
        expect(useAppSelector).toBeDefined();
        expect(typeof useAppDispatch).toBe('function');
        expect(typeof useAppSelector).toBe('function');
    });
});
