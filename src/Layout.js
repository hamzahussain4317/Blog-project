import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

import { Outlet } from 'react-router-dom'


const Layout = ({ children }) => {
    return (
        <div className='App'>
            {children}
        </div >
    );
};
export default Layout;