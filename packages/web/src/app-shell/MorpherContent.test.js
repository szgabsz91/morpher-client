import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import MorpherContent from './MorpherContent';

describe('MorpherContent', () => {
    test('should display the main section', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherContent />
            </BrowserRouter>
        );

        const main = queryByTestId('main');
        expect(main).toBeTruthy();
        expect(main).toHaveObfuscatedClass('content');
    });

    test('should display the appBar spacer div', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherContent />
            </BrowserRouter>
        );

        const appBarSpacer = queryByTestId('app-bar-spacer');
        expect(appBarSpacer).toBeTruthy();
        expect(appBarSpacer).toHaveObfuscatedClass('appBarSpacer');
    });

    test('should display the Container', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherContent />
            </BrowserRouter>
        );

        const container = queryByTestId('container');
        expect(container).toBeTruthy();
        expect(container).toHaveObfuscatedClass('container');
    });

    test('should display the footer container', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherContent />
            </BrowserRouter>
        );

        const footerContainer = queryByTestId('footer-container');
        expect(footerContainer).toBeTruthy();

        const copyright = queryByTestId('copyright');
        expect(copyright).toBeTruthy();
    });
});
