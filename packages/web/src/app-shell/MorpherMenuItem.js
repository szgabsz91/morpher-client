import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default function MorpherMenuItem({ to, label, children }) {
    const renderLink = useMemo(
        () => forwardRef((props, ref) => <Link ref={ref} to={to} {...props} />),
        [to]
    );

    return (
        <ListItem
            button
            component={renderLink}
        >
            <ListItemIcon>
                {children}
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItem>
    )
}

MorpherMenuItem.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};
