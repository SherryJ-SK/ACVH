import React from "react";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Mainsection from "./components/Mainsection/Mainsection";
import Wrapper from "./components/Container/Wrapper";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Characters from "./pages/Characters";
import Main from "./pages/Main";
import Friend from "./pages/Friend";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
// import UserInfo from "./components/UserInfo/UserInfo";
import NoMatch from "./pages/NoMatch";
import { useStoreContext } from "./utils/GlobalState";
import DriftBottle from "./pages/DriftBottle";

function App() {
    const [state, dispatch] = useStoreContext();

    // const id = state.map((item) => { return item.db_ID });
    console.log({ state });
    return (
        <Router>
            <Wrapper>
                <Redirect exact from="/" to="login" />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                {/* <Route exact path="/update" component={UserInfo} /> */}
                {/* {renderComp} */}
                {state.length ? (
                    <div>
                        {state.map((item) => (
                            <div key={item.id}>
                                <Header />
                                <Sidebar />
                                <Mainsection >
                                    <Route exact path={"/home/" + item.db_ID} component={Main} />
                                    <Route exact path={"/characters/" + item.db_ID} component={Characters} />
                                    <Route exact path={"/friends/" + item.db_ID} component={Friend} />
                                    <Route exact path={"/drift_bottle/" + item.db_ID} component={DriftBottle} />
                                </Mainsection>
                            </div>))}
                    </div>

                ) : (
                        <div></div>
                        // <NoMatch />
                    )}
            </Wrapper>
        </Router >
    )
};

export default App;