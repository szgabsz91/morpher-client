import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import MorpherDrawer from './MorpherDrawer';

describe('MorpherDrawer', () => {
    let props;

    beforeEach(() => {
        props = {
            isAppBarOpen: false,
            setAppBarOpen: jest.fn(),
            menuItemLabels: {
                home: 'Home',
                inflectionGeneration: 'Inflection Generation',
                morphologicalAnalysis: 'Morphological Analysis',
                settings: 'Settings'
            }
        };
    });

    test('should display the Drawer', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherDrawer {...props} />
            </BrowserRouter>
        );

        const drawer = queryByTestId('drawer');
        expect(drawer).toBeTruthy();
    });

    test('should display the Drawer paper in closed state', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <MorpherDrawer {...props} />
            </BrowserRouter>
        );

        const drawer = getByTestId('drawer');
        const paper = drawer.querySelector('.MuiDrawer-paper');
        expect(paper).toBeTruthy();
        expect(paper).toHaveObfuscatedClass('drawerPaper');
        expect(paper).toHaveObfuscatedClass('drawerPaperClosed');
    });

    test('should display the Drawer paper in open state', () => {
        props = {
            ...props,
            isAppBarOpen: true
        };
        const { getByTestId } = render(
            <BrowserRouter>
                <MorpherDrawer {...props} />
            </BrowserRouter>
        );

        const drawer = getByTestId('drawer');
        const paper = drawer.querySelector('.MuiDrawer-paper');
        expect(paper).toBeTruthy();
        expect(paper).toHaveObfuscatedClass('drawerPaper');
        expect(paper).not.toHaveObfuscatedClass('drawerPaperClosed');
    });

    test('should display the toolbar icon container', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherDrawer {...props} />
            </BrowserRouter>
        );

        const toolbarIconContainer = queryByTestId('toolbar-icon-container');
        expect(toolbarIconContainer).toBeTruthy();
        expect(toolbarIconContainer).toHaveObfuscatedClass('toolbarIconContainer');
    });

    test('should display the toolbar icon', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherDrawer {...props} />
            </BrowserRouter>
        );

        const toolbarIcon = queryByTestId('toolbar-icon');
        expect(toolbarIcon).toBeTruthy();
    });

    test('should close the AppBar if the toolbar icon is clicked', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <MorpherDrawer {...props} />
            </BrowserRouter>
        );

        const toolbarIcon = getByTestId('toolbar-icon');
        fireEvent.click(toolbarIcon);

        expect(props.setAppBarOpen).toBeCalledWith(false);
    });

    test('should display the menu divider', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherDrawer {...props} />
            </BrowserRouter>
        );

        const divider = queryByTestId('divider');
        expect(divider).toBeTruthy();
    });

    test('should display the home menu item', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherDrawer {...props} />
            </BrowserRouter>
        );

        const menuItemList = queryByTestId('menu-item-list');
        expect(menuItemList).toBeTruthy();

        const menuItems = menuItemList.querySelectorAll('a');
        expect(menuItems.length).toBe(4);

        const homeMenuItem = menuItems[0];
        expect(homeMenuItem).toHaveAttribute('href', '/');
        expect(homeMenuItem.querySelector('svg')).toBeTruthy();
        expect(homeMenuItem.querySelector('.MuiListItemText-root').textContent).toBe('Home');
    });

    test('should display the inflection generation menu item', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherDrawer {...props} />
            </BrowserRouter>
        );

        const menuItemList = queryByTestId('menu-item-list');
        expect(menuItemList).toBeTruthy();

        const menuItems = menuItemList.querySelectorAll('a');
        expect(menuItems.length).toBe(4);

        const inflectionGenerationMenuItem = menuItems[1];
        expect(inflectionGenerationMenuItem).toHaveAttribute('href', '/inflection-generation');
        expect(inflectionGenerationMenuItem.querySelector('svg')).toBeTruthy();
        expect(inflectionGenerationMenuItem.querySelector('.MuiListItemText-root').textContent).toBe('Inflection Generation');
    });

    test('should display the morphological analysis menu item', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherDrawer {...props} />
            </BrowserRouter>
        );

        const menuItemList = queryByTestId('menu-item-list');
        expect(menuItemList).toBeTruthy();

        const menuItems = menuItemList.querySelectorAll('a');
        expect(menuItems.length).toBe(4);

        const morphologicalAnalysisMenuItem = menuItems[2];
        expect(morphologicalAnalysisMenuItem).toHaveAttribute('href', '/morphological-analysis');
        expect(morphologicalAnalysisMenuItem.querySelector('svg')).toBeTruthy();
        expect(morphologicalAnalysisMenuItem.querySelector('.MuiListItemText-root').textContent).toBe('Morphological Analysis');
    });

    test('should display the settings menu item', () => {
        const { queryByTestId } = render(
            <BrowserRouter>
                <MorpherDrawer {...props} />
            </BrowserRouter>
        );

        const menuItemList = queryByTestId('menu-item-list');
        expect(menuItemList).toBeTruthy();

        const menuItems = menuItemList.querySelectorAll('a');
        expect(menuItems.length).toBe(4);

        const settingsMenuItem = menuItems[3];
        expect(settingsMenuItem).toHaveAttribute('href', '/settings');
        expect(settingsMenuItem.querySelector('svg')).toBeTruthy();
        expect(settingsMenuItem.querySelector('.MuiListItemText-root').textContent).toBe('Settings');
    });
});
