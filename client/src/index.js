import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { createStore } from "redux";
// import allReducers from "./reducers";
// import { Provider } from "react-redux";
import { StoreProvider } from "./utils/GlobalState";


// const store = createStore(
//     allReducers,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

ReactDOM.render(
    // <Provider store={store}>
    <StoreProvider>
        <App />
    </StoreProvider>
    // </Provider>
    , document.getElementById("root"));
