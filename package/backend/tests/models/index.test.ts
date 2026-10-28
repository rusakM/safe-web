import { describe, it, expect } from 'vitest';
import { SchemasGlobal } from '../../src/models/index';

describe('Models Root Index', () => {
    it('should re-export SchemasGlobal', () => {
        expect(SchemasGlobal).toBeDefined();
        expect(SchemasGlobal.Options).toBeDefined();
        expect(SchemasGlobal.Fields).toBeDefined();
    });
});
