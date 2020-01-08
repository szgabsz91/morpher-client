import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import MorpherStepInfoPopover from './MorpherStepInfoPopover';

describe('MorpherStepInfoPopover', () => {
    let props;

    beforeEach(() => {
        props = {
            popoverId: '1'
        };
    });

    it('should display a help icon', () => {
        const { queryByTestId } = render(
            <MorpherStepInfoPopover {...props}>
                <p>Popover content</p>
            </MorpherStepInfoPopover>
        );

        const helpIconButton = queryByTestId('help-icon-button');
        expect(helpIconButton).toBeTruthy();
        expect(helpIconButton).toHaveAttribute('aria-describedby', props.popoverId);
        expect(helpIconButton).toHaveObfuscatedClass('helpIcon');
    });

    it('should display a popover if the help icon is clicked', () => {
        const { getByTestId, queryByTestId } = render(
            <MorpherStepInfoPopover {...props}>
                <p>Popover content</p>
            </MorpherStepInfoPopover>
        );

        expect(queryByTestId('popover')).toBeFalsy();

        const helpIconButton = getByTestId('help-icon-button');
        fireEvent.click(helpIconButton);

        const popover = queryByTestId('popover');
        expect(popover).toBeTruthy();
        expect(popover).toHaveAttribute('id', props.popoverId);

        const popoverContent = popover.querySelector('p');
        expect(popoverContent).toBeTruthy();
        expect(popover.textContent).toBe('Popover content');
    });
});
