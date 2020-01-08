import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Flag from './Flag';

describe('Flag', () => {
    let props;

    beforeEach(() => {
        props = {
            flagImage: 'flag-image',
            languageName: 'language-name',
            onLanguageSelected: jest.fn()
        };
    });

    test('should display the IconButton', async () => {
        const { queryByTestId } = render(
            <Flag {...props} />
        );

        const iconButton = queryByTestId('icon-button');
        expect(iconButton).toBeTruthy();
    });

    test('should invoke the provided callback if the IconButton is clicked', () => {
        const { getByTestId } = render(
            <Flag {...props} />
        );

        const iconButton = getByTestId('icon-button');
        fireEvent.click(iconButton);

        expect(props.onLanguageSelected).toBeCalled();
    });

    test('should display the image', () => {
        const { queryByTestId } = render(
            <Flag {...props} />
        );

        const image = queryByTestId('image');
        expect(image).toBeTruthy();
        expect(image.src).toContain(props.flagImage);
        expect(image.alt).toBe(props.languageName);
        expect(image.title).toBe(props.languageName);
    });
});
