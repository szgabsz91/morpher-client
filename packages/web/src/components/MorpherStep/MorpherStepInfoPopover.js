import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export default function MorpherStepInfoPopover({ popoverId, children }) {
    const classes = useStyles();
    const [anchorElement, setAnchorElement] = useState(null);

    return (
        <>
            <IconButton
                aria-describedby={popoverId}
                className={classes.helpIcon}
                onClick={event => setAnchorElement(event.currentTarget)}
                data-testid="help-icon-button"
            >
                <HelpOutlineIcon />
            </IconButton>

            <Popover
                id={popoverId}
                open={!!anchorElement}
                anchorEl={anchorElement}
                onClose={/* istanbul ignore next */ () => setAnchorElement(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                data-testid="popover"
            >
                {children}
            </Popover>
        </>
    )
}

MorpherStepInfoPopover.propTypes = {
    popoverId: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

const useStyles = makeStyles(theme => ({
    helpIcon: {
        verticalAlign: 'middle'
    }
}));
