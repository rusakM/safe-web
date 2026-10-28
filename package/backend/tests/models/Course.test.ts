import { describe, it, expect } from 'vitest';
import { Course } from '../../src/models/Course';
import { ConstantsCourse } from '../../src/core/constants';

describe('Course Model Schema', () => {
    it('should be defined with the correct model name', () => {
        expect(Course).toBeDefined();
        expect(Course.modelName).toBeDefined();
        expect(Course.schema.path('courseNumber')).toBeDefined();
    });

    it('should validate a valid course structure', () => {
        const validCourse = new Course({
            courseNumber: 1,
            name: 'Internet Safety',
            nameTranslation: 'course_1_name',
            bibliography: [
                { title: 'Cybersecurity Guide', url: 'https://example.com/guide' },
            ],
            modules: [
                {
                    moduleNumber: 1,
                    moduleNameTranslation: 'module_1',
                    questions: [
                        {
                            questionNumber: 1,
                            question: 'What is phishing?',
                            answers: ['Attack', 'Sport'],
                            correctAnswer: 'Attack',
                            correctAnswerIndex: 0,
                            maxPoints: 1,
                            gameStage: ConstantsCourse.Game.STAGE_ENUM.INITIAL,
                        },
                    ],
                },
            ],
        });

        const err = validCourse.validateSync();
        expect(err).toBeUndefined();
        expect(validCourse.courseNumber).toBe(1);
    });

    it('should fail validation when gameStage is invalid', () => {
        const invalidCourse = new Course({
            courseNumber: 1,
            modules: [
                {
                    questions: [
                        {
                            gameStage: 'INVALID_STAGE_XYZ',
                        },
                    ],
                },
            ],
        });

        const err = invalidCourse.validateSync();
        expect(err).toBeDefined();
        expect(err?.errors['modules.0.questions.0.gameStage']).toBeDefined();
    });
});
