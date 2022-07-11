import React from 'react';
import { render } from '@testing-library/react';

import MorpherFooter from './MorpherFooter';

describe('MorpherFooter', () => {
    test('should display the copyright text', () => {
        const { queryByTestId } = render(
            <MorpherFooter />
        );

        const copyright = queryByTestId('copyright');
        expect(copyright).toBeTruthy();
        expect(copyright.textContent).toBe(`© AuthorName ${new Date().getFullYear()}`);
    });

    test('should display the link', () => {
        const { queryByTestId } = render(
            <MorpherFooter />
        );

        const link = queryByTestId('link');
        expect(link).toBeTruthy();
        expect(link.textContent).toBe('AuthorName');
        expect(link.href).toBe('https://github.com/szgabsz91');
        expect(link.target).toBe('_blank');
    });
});
