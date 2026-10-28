import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as responsive from 'react-responsive';
import {
    isIOS,
    MobileView,
    TabletView,
    DesktopView,
} from '../../src/helpers/responsiveContainers';

describe('Responsive Containers & Hooks', () => {
    it('isIOS should check userAgent for iOS devices', () => {
        expect(isIOS()).toBe(false);
    });

    it('MobileView should render children when mobile breakpoint matches', () => {
        vi.spyOn(responsive, 'useMediaQuery').mockReturnValue(true);

        render(
            <MobileView>
                <div>Mobile Only Content</div>
            </MobileView>
        );

        expect(screen.getByText('Mobile Only Content')).toBeInTheDocument();
    });

    it('DesktopView should render children when desktop breakpoint matches', () => {
        vi.spyOn(responsive, 'useMediaQuery').mockReturnValue(true);

        render(
            <DesktopView>
                <div>Desktop Content</div>
            </DesktopView>
        );

        expect(screen.getByText('Desktop Content')).toBeInTheDocument();
    });

    it('TabletView and NotMobileView should return fragment if not matching', () => {
        vi.spyOn(responsive, 'useMediaQuery').mockReturnValue(false);

        const { container } = render(
            <TabletView>
                <div>Hidden Tablet</div>
            </TabletView>
        );

        expect(container).toBeEmptyDOMElement();
    });
});
