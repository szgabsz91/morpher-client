import React from 'react';
import { render } from '@testing-library/react';

import HomePage from './HomePage';

describe('HomePage', () => {
    test('should display the page title', async () => {
        const { queryByTestId } = render(
            <HomePage />
        );

        const pageTitle = queryByTestId('page-title');
        expect(pageTitle).toBeTruthy();
        expect(pageTitle).toHaveObfuscatedClass('title');
    });

    test('should display the application logo', async () => {
        const { queryByTestId } = render(
            <HomePage />
        );

        const applicationLogo = queryByTestId('application-logo');
        expect(applicationLogo).toBeTruthy();
        expect(applicationLogo.src).toContain('morpher.png');
        expect(applicationLogo.alt).toBe('Title');
        expect(applicationLogo.title).toBe('Title');
    });

    test('should display the paragraphs', async () => {
        const { queryByTestId } = render(
            <HomePage />
        );

        const paragraph1 = queryByTestId('paragraph1');
        expect(paragraph1.textContent).toBe('Paragraph1');

        const paragraph2 = queryByTestId('paragraph2');
        expect(paragraph2.textContent).toBe('Paragraph2');

        const paragraph3 = queryByTestId('paragraph3');
        expect(paragraph3.textContent).toBe('Resources');
    });

    test('should display the Morpher link', async () => {
        const { queryByTestId } = render(
            <HomePage />
        );

        const morpherLink = queryByTestId('morpher-link');
        expect(morpherLink.href).toBe('https://github.com/szgabsz91/morpher');
        expect(morpherLink.target).toBe('_blank');
        expect(morpherLink.textContent).toBe('application:Title');
    });

    test('should display the Morpher API link', async () => {
        const { queryByTestId } = render(
            <HomePage />
        );

        const morpherAPILink = queryByTestId('morpher-api-link');
        expect(morpherAPILink.href).toBe('https://github.com/szgabsz91/morpher-api');
        expect(morpherAPILink.target).toBe('_blank');
        expect(morpherAPILink.textContent).toBe('MorpherAPI');
    });

    test('should display the Morpher Client link', async () => {
        const { queryByTestId } = render(
            <HomePage />
        );

        const morpherClientLink = queryByTestId('morpher-client-link');
        expect(morpherClientLink.href).toBe('https://github.com/szgabsz91/morpher-client');
        expect(morpherClientLink.target).toBe('_blank');
        expect(morpherClientLink.textContent).toBe('MorpherClient');
    });
});
