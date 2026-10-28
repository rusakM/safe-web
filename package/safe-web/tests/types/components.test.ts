import { describe, it, expect } from 'vitest';
import type { IComponentWithChildren } from '../../src/types/components';

describe('components types contracts', () => {
    it('should validate IComponentWithChildren shape', () => {
        const componentProps: IComponentWithChildren = {
            children: 'Test children content',
        };

        expect(componentProps.children).toBe('Test children content');
    });
});
