import { describe, it, expect } from 'vitest';
import http from 'http';
import initApp from '../src/app';

describe('App init', () => {
    it('should initialize and return an http.Server instance', async () => {
        const server = await initApp();
        expect(server).toBeDefined();
        expect(server).toBeInstanceOf(http.Server);
    });
});
