import React from "react";

import {Route, Switch, Redirect} from "react-router-dom";

import "./default.scss"
import HomePage from "./Pages/HomePage";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import MainLayout from "./layouts/MainLayout";
import {auth, handleUserProfile} from "./firebase/utils";

function App() {
    let authListener = null;

    const [currentUser, setCurrentUser] = React.useState(null)
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
                    <MainLayout currentUser={currentUser}>
                        <HomePage/>
                    </MainLayout>
                )}/>
                <Route path={'/registration'} render={() =>  currentUser ? <Redirect to="/"/> :(
                    <MainLayout currentUser={currentUser}>
                        <Registration/>
                    </MainLayout>
                )}/>
                <Route path={'/login'} render={() => currentUser ? <Redirect to="/"/> : (
                    <MainLayout currentUser={currentUser}>
                        <Login/>
                    </MainLayout>
                )}/>
            </Switch>
        </div>
    );
}

export default App;
