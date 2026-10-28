import { describe, it, expect } from 'vitest';
import router from '../../src/controllers/index';

describe('Controllers Root Router', () => {
    it('should be defined and have route stack', () => {
        expect(router).toBeDefined();
        // Express router stack contains the registered route layers
        expect((router as any).stack).toBeDefined();
        expect((router as any).stack.length).toBeGreaterThan(0);
    });

    it('should register routes for course, materials, and userAuth', () => {
        const routes: string[] = [];
        (router as any).stack.forEach((layer: any) => {
            if (layer.route) {
                routes.push(layer.route.path);
            }
        });

        expect(routes).toContain('/api/course/list');
        expect(routes).toContain('/api/materials');
        expect(routes).toContain('/api/user/auth/login');
        expect(routes).toContain('/api/user/auth/register');
    });
});
