import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import MorpherMenuItem from './MorpherMenuItem';

describe('MorpherMenuItem', () => {
    test('should display a link with the specified URL and label', () => {
        const props = {
            to: '/other',
            label: 'Link'
        };
        const { container } = render(
            <BrowserRouter>
                <MorpherMenuItem {...props}>
                    <div data-testid="child" />
                </MorpherMenuItem>
            </BrowserRouter>
        );

        const anchor = container.querySelector('a');
        expect(anchor).toHaveAttribute('href', props.to);
        expect(anchor.querySelector('[data-testid="child"]')).toBeTruthy();
        expect(anchor.querySelector('.MuiListItemText-root').textContent).toBe(props.label);
    });
});
