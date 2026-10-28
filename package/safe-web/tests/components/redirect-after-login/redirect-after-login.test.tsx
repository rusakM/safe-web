import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import RedirectAfterLogin from '../../../src/components/redirect-after-login/redirect-after-login';
import { renderWithProviders } from '../../test-utils';
import { UserRoleEnum } from '../../../src/types/user';

describe('RedirectAfterLogin Component', () => {
    const DummyComponent: React.FC = () => <div>Login Form Page</div>;

    it('should render Component if currentUser is null', () => {
        renderWithProviders(
            <RedirectAfterLogin currentUser={null} Component={DummyComponent} />
        );
        expect(screen.getByText('Login Form Page')).toBeInTheDocument();
    });

    it('should redirect if user is already logged in with role', () => {
        const user = { _id: 'u1', email: 'test@test.com', role: UserRoleEnum.STUDENT };
        renderWithProviders(
            <RedirectAfterLogin currentUser={user as any} Component={DummyComponent} />
        );
        expect(screen.queryByText('Login Form Page')).not.toBeInTheDocument();
    });
});
