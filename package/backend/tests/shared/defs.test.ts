import { describe, it, expect } from 'vitest';
import { Helper, DataError, InvalidError, ResponseError } from '../../src/shared/defs';
import { ConstantsEnv } from '../../src/core/constants';

describe('Shared Defs & Helper', () => {
    describe('Error Classes', () => {
        it('should instantiate DataError correctly', () => {
            const err = new DataError('users', 'insert', '123');
            expect(err.collection).toBe('users');
            expect(err.operation).toBe('insert');
            expect(err.id).toBe('123');
        });

        it('should instantiate InvalidError correctly', () => {
            const err = new InvalidError('account', [{ message: 'bad' } as any]);
            expect(err.entity).toBe('account');
            expect(err.details).toHaveLength(1);
        });

        it('should instantiate ResponseError correctly', () => {
            const err = new ResponseError();
            err.status = 400;
            err.message = 'Bad request';
            expect(err.status).toBe(400);
            expect(err.message).toBe('Bad request');
        });
    });

    describe('Helper methods', () => {
        it('generateRandomInteger should generate number between min and max', () => {
            const num = Helper.generateRandomInteger(5, 10);
            expect(num).toBeGreaterThanOrEqual(5);
            expect(num).toBeLessThanOrEqual(10);
        });

        it('copyArray should create a shallow copy of an array', () => {
            const orig = [1, 2, 3];
            const copy = Helper.copyArray(orig);
            expect(copy).toEqual(orig);
            expect(copy).not.toBe(orig);
            expect(Helper.copyArray([])).toEqual([]);
        });

        it('compareObjects should accurately compare object structures', () => {
            expect(Helper.compareObjects({ a: 1, b: 'x' }, { a: 1, b: 'x' })).toBe(true);
            expect(Helper.compareObjects({ a: 1 }, { a: 2 })).toBe(false);
            expect(Helper.compareObjects({ a: 1 }, { b: 1 })).toBe(false);
            expect(Helper.compareObjects({ a: { deep: true } }, { a: { deep: true } })).toBe(true);
            expect(Helper.compareObjects('a', 'a')).toBe(true);
            expect(Helper.compareObjects('a', 'b')).toBe(false);
        });

        it('isTestModeEnabled should check against PRODUCTION mode', () => {
            expect(Helper.isTestModeEnabled()).toBe(true);
        });

        it('removePassword should omit password property', () => {
            const input = { email: 'test@test.com', password: 'secret', name: 'User' };
            const output = Helper.removePassword(input);
            expect(output).toEqual({ email: 'test@test.com', name: 'User' });
            expect(output.password).toBeUndefined();
        });

        it('sort should sort data array', () => {
            const data = [{ val: '2026-02-01' }, { val: '2026-01-01' }, { val: '2026-03-01' }];
            const asc = Helper.sort(data, 'val', 'ASC');
            expect(asc[0].val).toBe('2026-01-01');
            const desc = Helper.sort(data, 'val', 'DESC');
            expect(desc[0].val).toBe('2026-03-01');
        });

        it('prepareTableName should prepend table prefix if present', () => {
            const name = Helper.prepareTableName('users');
            expect(name).toContain('users');
        });

        it('enumToObject should map enum keys and values', () => {
            enum Colors {
                RED = 'red',
                BLUE = 'blue',
            }
            const mapped = Helper.enumToObject(Colors);
            expect(mapped).toEqual({ red: 'red', blue: 'blue' });
        });

        it('findObjectDifferencesWithPattern should return changed fields', () => {
            const pattern = { a: 1, b: 2, c: 3 };
            const current = { a: 1, b: 20, c: 3 };
            const diff = Helper.findObjectDifferencesWithPattern(pattern, current);
            expect(diff).toEqual({ b: 20 });
        });

        it('isNumber should validate numeric types', () => {
            expect(Helper.isNumber(42)).toBe(true);
            expect(Helper.isNumber(0)).toBe(true);
            expect(Helper.isNumber(NaN)).toBe(false);
            expect(Helper.isNumber('42')).toBe(false);
            expect(Helper.isNumber(null)).toBe(false);
        });

        it('createPackets should partition array into chunk packets', () => {
            const list = [1, 2, 3, 4, 5];
            const packets = Helper.createPackets(list, 2);
            expect(packets).toEqual([[1, 2], [3, 4], [5]]);
        });

        it('removeDuplicatesByKey should filter duplicates by selector key', () => {
            const list = [
                { id: 1, name: 'A' },
                { id: 2, name: 'B' },
                { id: 1, name: 'A duplicate' },
            ];
            const unique = Helper.removeDuplicatesByKey(list, (item) => item.id);
            expect(unique).toHaveLength(2);
            expect(unique.map((u) => u.name)).toEqual(['A', 'B']);
        });
    });
});
