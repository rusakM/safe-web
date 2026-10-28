import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { getData, sendData, AppError } from '../../src/api/index';

vi.mock('axios');

describe('API Client Layer', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    describe('getData', () => {
        it('should make GET request with auth header when token exists', async () => {
            localStorage.setItem('token', 'fake_jwt_token');
            vi.mocked(axios).mockResolvedValueOnce({ data: { message: 'success' } });

            const result = await getData('/api/test');

            expect(axios).toHaveBeenCalledWith(expect.objectContaining({
                method: 'GET',
                url: '/api/test',
                headers: expect.objectContaining({
                    Authorization: 'Bearer fake_jwt_token',
                    'Content-Type': 'application/json',
                }),
            }));
            expect(result).toEqual({ message: 'success' });
        });

        it('should handle axios error and throw response data', async () => {
            const axiosError = {
                isAxiosError: true,
                response: { data: { error: 'Not authorized' } },
            };
            vi.mocked(axios.isAxiosError).mockReturnValue(true);
            vi.mocked(axios).mockRejectedValueOnce(axiosError);

            await expect(getData('/api/err')).rejects.toEqual({ error: 'Not authorized' });
        });
    });

    describe('sendData', () => {
        it('should make request with method, body data and credentials', async () => {
            vi.mocked(axios).mockResolvedValueOnce({ data: { id: 123 } });

            const result = await sendData('/api/user', { name: 'Alice' }, 'POST');

            expect(axios).toHaveBeenCalledWith(expect.objectContaining({
                url: '/api/user',
                method: 'POST',
                data: { name: 'Alice' },
                withCredentials: true,
            }));
            expect(result).toEqual({ id: 123 });
        });
    });

    describe('AppError', () => {
        it('should create instance with code, message and name', () => {
            const err = new AppError('Custom error', 404);
            expect(err.message).toBe('Custom error');
            expect(err.code).toBe(404);
            expect(err.name).toBe('AppError');
            expect(err).toBeInstanceOf(Error);
        });
    });
});
