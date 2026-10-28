import { describe, it, expect } from 'vitest';
import {
    secondsToMinutes,
    msToSeconds,
    capitalizeFirstLetter,
    convertTimeUntilToRemainedSeconds,
    verifyTokenExpiration,
} from '../../src/helpers/shared.functions';

describe('Shared Functions', () => {
    it('secondsToMinutes should format seconds into MM:SS string', () => {
        expect(secondsToMinutes(65)).toBe('01:05');
        expect(secondsToMinutes(0)).toBe('00:00');
        expect(secondsToMinutes(600)).toBe('10:00');
    });

    it('msToSeconds should convert milliseconds to seconds', () => {
        expect(msToSeconds(5000)).toBe(5);
        expect(msToSeconds(0)).toBe(0);
        expect(msToSeconds(-100)).toBe(0);
    });

    it('capitalizeFirstLetter should capitalize first character', () => {
        expect(capitalizeFirstLetter('safeWeb')).toBe('SafeWeb');
        expect(capitalizeFirstLetter('')).toBe('');
    });

    it('convertTimeUntilToRemainedSeconds should calculate delta from Date.now()', () => {
        const futureTime = Date.now() + 10000;
        const seconds = convertTimeUntilToRemainedSeconds(futureTime);
        expect(seconds).toBeGreaterThanOrEqual(9);
        expect(seconds).toBeLessThanOrEqual(10);
    });

    it('verifyTokenExpiration should validate JWT token expiration safely', () => {
        // Invalid or empty token returns false
        expect(verifyTokenExpiration('')).toBe(false);
        expect(verifyTokenExpiration('invalid.jwt')).toBe(false);

        // Future token (exp in 2 hours)
        const futurePayload = { exp: Math.floor(Date.now() / 1000) + 7200 };
        const validToken = `header.${btoa(JSON.stringify(futurePayload))}.signature`;
        expect(verifyTokenExpiration(validToken)).toBe(true);

        // Expired token (exp in past)
        const pastPayload = { exp: Math.floor(Date.now() / 1000) - 100 };
        const expiredToken = `header.${btoa(JSON.stringify(pastPayload))}.signature`;
        expect(verifyTokenExpiration(expiredToken)).toBe(false);
    });
});
