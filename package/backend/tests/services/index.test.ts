import { describe, it, expect } from 'vitest';
import * as services from '../../src/services/index';

describe('Services Root Index', () => {
    it('should re-export all services', () => {
        expect(services.accountService).toBeDefined();
        expect(services.courseService).toBeDefined();
        expect(services.fileService).toBeDefined();
        expect(services.loggerService).toBeDefined();
        expect(services.mailService).toBeDefined();
        expect(services.materialService).toBeDefined();
        expect(services.playerCourseService).toBeDefined();
        expect(services.templateService).toBeDefined();
        expect(services.translationsService).toBeDefined();
    });
});
