import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/SideBar/SideBar';
import Footer from './components/Footer/Footer';

const Layout = () => {
    return (
        <div className="main-wrapper d-flex flex-column min-vh-100">
            <Header />
            <Sidebar />
            <div className="page-wrapper flex-grow-1 d-flex flex-column">
                <div className="content container-fluid">
                    <Outlet />
                </div>
            </div>
            <Footer className="mt-auto" />
        </div>
    );
};

export default Layout;
