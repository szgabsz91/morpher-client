import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import MorpherAppBar from './MorpherAppBar';

describe('MorpherAppBar', () => {
    let props;

    beforeEach(() => {
        props = {
            isAppBarOpen: false,
            setAppBarOpen: jest.fn(),
            applicationTitle: 'Application title',
            toggleDrawerButtonLabel: 'Button label'
        };
    });

    test('should display the AppBar', async () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherAppBar {...props} />
            </BrowserRouter>
        );

        const appBar = queryByTestId('app-bar');
        expect(appBar).toBeTruthy();
        expect(appBar).toHaveObfuscatedClass('appBar');
        expect(appBar).not.toHaveObfuscatedClass('appBarShift');
    });

    test('shoud display the AppBar with an extra CSS class if it is open', () => {
        props = {
            ...props,
            isAppBarOpen: true
        };

        const { getByTestId } = render(
            <BrowserRouter>
                <MorpherAppBar {...props} />
            </BrowserRouter>
        );

        const appBar = getByTestId('app-bar');
        expect(appBar).toHaveObfuscatedClass('appBar');
        expect(appBar).toHaveObfuscatedClass('appBarShift');
    });

    test('should display the Toolbar', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherAppBar {...props} />
            </BrowserRouter>
        );

        const toolbar = queryByTestId('toolbar');
        expect(toolbar).toBeTruthy();
        expect(toolbar).toHaveObfuscatedClass('toolbar');
    });

    test('should display the menu icon button', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherAppBar {...props} />
            </BrowserRouter>
        );

        const menuIconButton = queryByTestId('menu-icon-button');
        expect(menuIconButton).toBeTruthy();
        expect(menuIconButton).toHaveAttribute('aria-label', props.toggleDrawerButtonLabel);
        expect(menuIconButton).toHaveObfuscatedClass('menuButton');
        expect(menuIconButton).not.toHaveObfuscatedClass('menuButtonHidden');
    });

    test('should display the menu icon button with an extra CSS class if the app bar is open', () => {
        props = {
            ...props,
            isAppBarOpen: true
        };

        const { getByTestId } = render(
            <BrowserRouter>
                <MorpherAppBar {...props} />
            </BrowserRouter>
        );

        const menuIconButton = getByTestId('menu-icon-button');
        expect(menuIconButton).toHaveObfuscatedClass('menuButton');
        expect(menuIconButton).toHaveObfuscatedClass('menuButtonHidden');
    });

    test('should open the AppBar if the menu icon button is clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <MorpherAppBar {...props} />
            </BrowserRouter>
        );

        const menuIconButton = getByTestId('menu-icon-button');
        fireEvent.click(menuIconButton);

        expect(props.setAppBarOpen).toBeCalledWith(true);
    });

    test('should display the application title', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherAppBar {...props} />
            </BrowserRouter>
        );

        const applicationTitle = queryByTestId('application-title');
        expect(applicationTitle).toBeTruthy();
        expect(applicationTitle).toHaveObfuscatedClass('title');
    });

    test('should display the home page link', () => {
        const history = createMemoryHistory({
            initialEntries: ['/other']
        });
        const { queryByTestId } = render(
            <Router history={history}>
                <MorpherAppBar {...props} />
            </Router>
        );

        const homeLink = queryByTestId('home-link');
        fireEvent.click(homeLink);

        expect(history.location.pathname).toBe('/');
    });

    test('should display the application logo', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherAppBar {...props} />
            </BrowserRouter>
        );

        const applicationLogo = queryByTestId('application-logo');
        expect(applicationLogo).toBeTruthy();
        expect(applicationLogo).toHaveAttribute('alt', props.applicationTitle);
        expect(applicationLogo).toHaveAttribute('title', props.applicationTitle);
        expect(applicationLogo).toHaveObfuscatedClass('logo');
        expect(applicationLogo).toHaveAttribute('src', 'morpher.png');
    });
});
