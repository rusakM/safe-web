import { describe, it, expect, vi } from 'vitest';
import {
    redirect,
    generateRandomId,
    handleInputText,
    checkCurrentUser,
    downloadFile,
} from '../../src/helpers/events.functions';

describe('Events Functions', () => {
    it('redirect should preventDefault and call window.open', () => {
        const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
        const event: any = { preventDefault: vi.fn() };

        const handler = redirect('https://example.com', '_blank');
        handler(event);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank');
    });

    it('generateRandomId should generate uuid with optional length truncation', () => {
        const id1 = generateRandomId();
        expect(id1).toBeDefined();
        expect(typeof id1).toBe('string');

        const id2 = generateRandomId(8);
        expect(id2.length).toBe(8);
    });

    it('handleInputText should call dispatch with input value and trigger callback', () => {
        const dispatch = vi.fn();
        const cb = vi.fn();
        const event: any = {
            preventDefault: vi.fn(),
            target: { value: 'user_text' },
        };

        const handler = handleInputText(dispatch, cb);
        handler(event);

        expect(dispatch).toHaveBeenCalledWith('user_text');
        expect(cb).toHaveBeenCalled();
    });

    it('checkCurrentUser should return true if user has email', () => {
        expect(checkCurrentUser(null)).toBeFalsy();
        expect(checkCurrentUser({} as any)).toBeFalsy();
        expect(checkCurrentUser({ email: 'test@example.com' } as any)).toBeTruthy();
    });

    it('downloadFile should create link element and trigger download click', () => {
        const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

        downloadFile('https://example.com/files/handbook.pdf');

        expect(clickSpy).toHaveBeenCalled();
        clickSpy.mockRestore();
    });
});
