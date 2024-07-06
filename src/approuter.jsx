import React from 'react';
import AppContainer from './appcontainer.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import config from 'config';

const AppRouter = () => {
    return (
        <>
            <Router basename={`${config.publicPath}`}>
                <Routes>
                    <Route path="*" element={<AppContainer />} />
                </Routes>
            </Router>
        </>
    );
}

export default AppRouter;
