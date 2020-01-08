import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

import morpherLogo from '@szg/morpher-client-shared/assets/morpher.png';

import { drawerWidth } from './constants';

export default function MorpherAppBar({ isAppBarOpen, setAppBarOpen, applicationTitle, toggleDrawerButtonLabel }) {
    const classes = useStyles();

    return (
        <AppBar
            position="absolute"
            className={clsx(classes.appBar, isAppBarOpen && classes.appBarShift)}
            data-testid="app-bar"
        >
            <Toolbar
                className={classes.toolbar}
                data-testid="toolbar"
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label={toggleDrawerButtonLabel}
                    onClick={() => setAppBarOpen(true)}
                    className={clsx(classes.menuButton, isAppBarOpen && classes.menuButtonHidden)}
                    data-testid="menu-icon-button"
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                    data-testid="application-title"
                >
                    <Link
                        to="/"
                        data-testid="home-link"
                    >
                        <img
                            src={morpherLogo}
                            alt={applicationTitle}
                            title={applicationTitle}
                            className={classes.logo}
                            data-testid="application-logo"
                        />
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

MorpherAppBar.propTypes = {
    isAppBarOpen: PropTypes.bool.isRequired,
    setAppBarOpen: PropTypes.func.isRequired,
    applicationTitle: PropTypes.string.isRequired,
    toggleDrawerButtonLabel: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    toolbar: {
        paddingRight: 24
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    title: {
        flexGrow: 1
    },
    logo: {
        maxHeight: 55,
        [theme.breakpoints.down('xs')]: {
            maxHeight: 39
        }
    }
}));
