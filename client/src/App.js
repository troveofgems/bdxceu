import React from 'react';

// Shared Components
import Header from "./components/shared/Header/Header";
import Footer from "./components/shared/Footer/Footer";

import {Outlet} from "react-router-dom";

import "./App.css";
import ScrollToTop from "./utils/ScrollToTop";
const App = () => {
    return (
        <>
            <ScrollToTop />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default App;