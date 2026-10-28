import { describe, it, expect } from 'vitest';
import { Footer, Course, LandingPage, Main, Materials, Partners, User } from '../../../src/helpers/constants/urls';

describe('Constants URLs', () => {
    it('Footer URLs should be correctly defined', () => {
        expect(Footer.conditionTerms).toContain('.pdf');
        expect(Footer.privacyPolicy).toContain('.pdf');
        expect(Footer.instagram).toContain('instagram.com');
        expect(Footer.linkedIn).toContain('linkedin.com');
        expect(Footer.youtube).toContain('youtube.com');
    });

    it('Course URLs should generate correct dynamic and static routes', () => {
        expect(Course.getAll).toBe('/api/course/list');
        expect(Course.getPlayerStats).toBe('/api/course/stats');
        expect(Course.get('c123')).toBe('/api/course/c123');
        expect(Course.getPlayerCourse('c123')).toBe('/api/course/c123/stats');
        expect(Course.sendAnswer('c123')).toBe('/api/course/c123/answer');
    });

    it('LandingPage and Main URLs should match route conventions', () => {
        expect(LandingPage.main).toBe('/');
        expect(LandingPage.signIn).toBe('/signin');
        expect(LandingPage.signUp).toBe('/signup');
        expect(LandingPage.confirm).toBe('/confirm');
        expect(LandingPage.fillRegisterData).toBe('/signup-finish');

        expect(Main.courses).toBe('/courses');
        expect(Main.materials).toBe('/materials');
        expect(Main.myProfile).toBe('/my-profile');
        expect(Main.game).toBe('/game');
    });

    it('Materials, Partners and User URLs should be valid strings', () => {
        expect(Materials.getMaterials).toBe('/api/materials');
        expect(Partners.eurolider).toContain('euro-lider.eu');
        expect(User.checkEmail).toBe('/api/user/auth/login');
        expect(User.signUp).toBe('/api/user/auth/register');
        expect(User.confirm).toBe('/api/user/auth/confirm');
    });
});
