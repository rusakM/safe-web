import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockRender = vi.fn();
const mockCreateRoot = vi.fn().mockReturnValue({ render: mockRender });

vi.mock('react-dom/client', () => ({
    createRoot: (el: HTMLElement) => mockCreateRoot(el),
}));

describe('main entry point', () => {
    beforeEach(() => {
        let rootDiv = document.getElementById('root');
        if (!rootDiv) {
            rootDiv = document.createElement('div');
            rootDiv.id = 'root';
            document.body.appendChild(rootDiv);
        }
    });

    it('should mount application into #root element', async () => {
        await import('../src/main');

        const rootEl = document.getElementById('root');
        expect(mockCreateRoot).toHaveBeenCalledWith(rootEl);
        expect(mockRender).toHaveBeenCalled();
    }, 20000);
});
