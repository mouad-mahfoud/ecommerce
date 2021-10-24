import React from "react";

import {Route, Switch} from "react-router-dom";

import "./default.scss"
import HomePage from "./Pages/HomePage";
import Registration from "./Pages/Registration";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path={'/'} render={() => (
                    <MainLayout>
                        <HomePage/>
                    </MainLayout>
                )}/>
                <Route path={'/registration'} render={() => (
                    <MainLayout>
                        <Registration/>
                    </MainLayout>
                )}/>
            </Switch>
        </div>
    );
}

export default App;
