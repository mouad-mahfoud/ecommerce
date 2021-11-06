import React from 'react';

import './styles.scss'

const AuthWraper = ({ title, children}) => {


    return (
        <div className="wrapper">
            <h2>{title}</h2>

            <div className="children">

            {children && children}
            </div>
        </div>
    )
};

export default AuthWraper;