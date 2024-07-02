import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/SideBar/SideBar';
import Footer from './components/Footer/Footer';

const Layout = () => {
    return (
        <div className="main-wrapper">
            <Header />
            <Sidebar />
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
