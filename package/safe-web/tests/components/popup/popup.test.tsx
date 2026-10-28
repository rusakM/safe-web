import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Popup from '../../../src/components/popup/popup';

describe('Popup Component', () => {
    it('should render children content inside popup', () => {
        render(
            <Popup visible={true}>
                <div>Modal dialog body</div>
            </Popup>
        );
        expect(screen.getByText('Modal dialog body')).toBeInTheDocument();
    });
});
