import '@testing-library/jest-dom';
import { vi } from 'vitest';

if (typeof globalThis.DOMMatrix === 'undefined') {
    globalThis.DOMMatrix = class DOMMatrix {
        a = 1;
        b = 0;
        c = 0;
        d = 1;
        e = 0;
        f = 0;
    } as any;
}

if (typeof window !== 'undefined' && !window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }),
    });
}

// Global mock for Tolgee i18n
vi.mock('@tolgee/react', () => ({
    useTranslate: () => ({
        t: (key: string, defaultValue?: string) => defaultValue || key,
    }),
    useTolgee: () => ({
        changeLanguage: vi.fn(),
        getLanguage: () => 'en',
    }),
    TolgeeProvider: ({ children }: any) => children,
    Tolgee: () => {
        const instance = {
            use: () => instance,
            init: () => instance,
            changeLanguage: vi.fn(),
            getLanguage: () => 'en',
        };
        return instance;
    },
    DevTools: () => ({}),
    BackendFetch: () => ({}),
    FormatSimple: () => ({}),
}));

vi.mock('@tolgee/format-icu', () => ({
    FormatIcu: () => ({}),
}));
