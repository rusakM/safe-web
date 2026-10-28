import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Separator from '../../../src/components/separator/separator';

describe('Separator Component', () => {
    it('should render div with specified width', () => {
        const { container } = render(<Separator width={200} color="orange" />);
        const div = container.firstChild as HTMLElement;
        expect(div).toBeInTheDocument();
        expect(div.style.width).toBe('200px');
    });
});
