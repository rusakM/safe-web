import { describe, it, expect } from 'vitest';
import * as core from '../../src/core/index';

describe('Core Root Index', () => {
    it('should re-export dbConnector', () => {
        expect(core.dbConnector).toBeDefined();
    });
});
