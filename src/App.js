import React from "react";

import "./default.scss"
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";

function App() {
    return (
        <div className="App">
            <Header/>
            <main>
                <HomePage/>
            </main>
        </div>
    );
}

export default App;
