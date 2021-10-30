import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = (props) => (
    <>
        <Header {...props} />
        <main>
            {props.children}
        </main>
        <Footer/>
    </>
);

export default MainLayout;