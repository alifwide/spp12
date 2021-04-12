import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
} from "react-router-dom";
import LoginAdmin from "./pages/LoginAdmin.js";
import LoginSiswa from "./pages/LoginSiswa.js";
import Home from "./pages/HomeAdmin.js";
import Tes from "./pages/Tes.js"

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/loginAdmin" component={LoginAdmin} />
                <Route path="/LoginSiswa" component={LoginSiswa} />
                <Route path="/HomeAdmin" component={Home} />
                <Route path="/HomeSiswa" component={Home} />
                <Route path="/tes" component={Tes} />

            </Switch>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));
