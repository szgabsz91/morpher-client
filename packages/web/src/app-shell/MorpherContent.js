import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import HomePage from '../pages/HomePage/HomePage';
import InflectionGenerationPage from '../pages/InflectionGenerationPage/InflectionGenerationPage';
import MorphologicalAnalysisPage from '../pages/MorphologicalAnalysisPage/MorphologicalAnalysisPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import MorpherFooter from './MorpherFooter';

export default function MorpherContent() {
    const classes = useStyles();

    return (
        <main
            className={classes.content}
            data-testid="main"
        >
            <div
                className={classes.appBarSpacer}
                data-testid="app-bar-spacer"
            />

            <Container
                maxWidth="lg"
                className={classes.container}
                data-testid="container"
            >
                <Routes>
                    <Route
                        path="/"
                        exact
                        element={<HomePage />}
                        data-testid="home-page"
                    />

                    <Route
                        path="/inflection-generation"
                        element={<InflectionGenerationPage />}
                    />
                    
                    <Route
                        path="/morphological-analysis"
                        element={<MorphologicalAnalysisPage />}
                    />
                    
                    <Route
                        path="/settings"
                        element={<SettingsPage />}
                    />
                </Routes>

                <Box
                    pt={4}
                    data-testid="footer-container"
                >
                    <MorpherFooter />
                </Box>
            </Container>
        </main>
    );
}

MorpherContent.propTypes = {};

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        minWidth: 890,
        overflow: 'auto'
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        width: '80%',
        maxWidth: 700,
        margin: 'auto',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    }
}));
