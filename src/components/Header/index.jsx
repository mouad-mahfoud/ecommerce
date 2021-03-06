import React from 'react';

import { connect } from 'react-redux'
import './styles.scss';
import logo from '../../assets/logo192.png'
import {Link} from "react-router-dom";
import {auth} from "../../firebase/utils";

function Header(props) {
    const {currentUser} = props;

    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="The logo"/>
                    </Link>
                </div>
                <div className="callToActions">
                    {
                        currentUser ?
                            (<ul>
                                <li>
                                    <Link to='/dashboard'>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <span onClick={() => auth.signOut()}> LogOut </span>
                                </li>
                            </ul>)
                            :
                            (
                                <ul>
                                    <li>
                                        <Link to="/registration">
                                            Register
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/login">
                                            Login
                                        </Link>
                                    </li>
                                </ul>
                            )
                    }
                </div>
            </div>
        </header>
    );
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser
});

export default connect(mapStateToProps, null)(Header);