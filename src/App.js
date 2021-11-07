import React from "react";

import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from 'react-redux'

import "./default.scss"
import HomePage from "./Pages/HomePage";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import MainLayout from "./layouts/MainLayout";
import {auth, handleUserProfile} from "./firebase/utils";
import ResetPassword from "./Pages/ResetPassword";
import {setCurrentUser} from './redux/User/user.actions'

const App = ({currentUser, setCurrentUser}) => {
    let authListener = null;

    React.useEffect(() => {
        authListener = auth.onAuthStateChanged(async userAuth => {
            if (!userAuth) {
                setCurrentUser(null);
            } else {
                const userRef = await handleUserProfile(userAuth);
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    });

                });
            }
        });

        return () => authListener();
    }, []);
    return (
        <div className="App">
            <Switch>
                <Route exact path={'/'} render={() => (
                    <MainLayout>
                        <HomePage/>
                    </MainLayout>
                )}/>
                <Route path={'/registration'} render={() => currentUser ? <Redirect to="/"/> : (
                    <MainLayout>
                        <Registration/>
                    </MainLayout>
                )}/>
                <Route path={'/login'} render={() => currentUser ? <Redirect to="/"/> : (
                    <MainLayout>
                        <Login/>
                    </MainLayout>
                )}/>
                <Route path={'/reset-password'} render={() => (
                    <MainLayout>
                        <ResetPassword/>
                    </MainLayout>
                )}/>
            </Switch>
        </div>
    );
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
});
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
