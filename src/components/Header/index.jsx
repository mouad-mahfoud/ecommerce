import React from 'react';

import './styles.scss';
import logo from '../../assets/logo192.png'

function Header(props) {
    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <img src={logo} alt="The logo"/>
                </div>
            </div>
        </header>
    );
}

export default Header;