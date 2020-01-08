import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import SettingsIcon from '@material-ui/icons/Settings';

import { drawerWidth } from './constants';
import MorpherMenuItem from './MorpherMenuItem';

export default function MorpherDrawer({ isAppBarOpen, setAppBarOpen, menuItemLabels }) {
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !isAppBarOpen && classes.drawerPaperClosed)
            }}
            open={isAppBarOpen}
            data-testid="drawer"
        >
            <div
                className={classes.toolbarIconContainer}
                data-testid="toolbar-icon-container"
            >
                <IconButton
                    onClick={() => setAppBarOpen(false)}
                    data-testid="toolbar-icon"
                >
                    <ChevronLeftIcon />
                </IconButton>
            </div>

            <Divider data-testid="divider" />

            <List
                component="nav"
                data-testid="menu-item-list"
            >
                <MorpherMenuItem
                    to="/"
                    label={menuItemLabels.home}
                >
                    <HomeIcon />
                </MorpherMenuItem>
                <MorpherMenuItem
                    to="/inflection-generation"
                    label={menuItemLabels.inflectionGeneration}
                >
                    <KeyboardArrowRightIcon />
                </MorpherMenuItem>
                <MorpherMenuItem
                    to="/morphological-analysis"
                    label={menuItemLabels.morphologicalAnalysis}
                >
                    <KeyboardArrowLeftIcon />
                </MorpherMenuItem>
                <MorpherMenuItem
                    to="/settings"
                    label={menuItemLabels.settings}
                >
                    <SettingsIcon />
                </MorpherMenuItem>
            </List>
        </Drawer>
    );
}

MorpherDrawer.propTypes = {
    isAppBarOpen: PropTypes.bool.isRequired,
    setAppBarOpen: PropTypes.func.isRequired,
    menuItemLabels: PropTypes.exact({
        home: PropTypes.string.isRequired,
        inflectionGeneration: PropTypes.string.isRequired,
        morphologicalAnalysis: PropTypes.string.isRequired,
        settings: PropTypes.string.isRequired
    }).isRequired
};

const useStyles = makeStyles(theme => ({
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClosed: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9)
        }
    },
    toolbarIconContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    }
}));
