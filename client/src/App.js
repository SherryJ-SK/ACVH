import React from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Mainsection from "./components/Mainsection/Mainsection";
import Wrapper from "./components/Container/Wrapper";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Characters from "./pages/Characters";
import Main from "./pages/Main";
import Friend from "./pages/Friend";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import UserInfo from "./components/UserInfo/UserInfo";
import { useStoreContext } from "./utils/GlobalState";

function App() {
    const [state, dispatch] = useStoreContext();

    return (
        <Router>
            <Wrapper>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/update" component={UserInfo} />
                {state.map((item) => (
                    <div key={item.id} style={{ display: item.logIn ? 'block' : 'none' }}>
                        <Header />
                        <Sidebar />
                        <Mainsection >
                            <Route exact path={"/home/" + item.db_ID} component={Main} />
                            <Route exact path={"/characters/" + item.db_ID} component={Characters} />
                            <Route exact path={"/friends/" + item.db_ID} component={Friend} />
                        </Mainsection>
                    </div>))}
            </Wrapper>
        </Router >
    )
};

export default App;