import React, { createContext, useReducer, useContext } from "react";
import {
    loggedIn,
    signedIn,
    updateUser,
} from "./actions";

const StoreContext = createContext({
    id: 0,
    db_ID: "",
    name: "",
    email: "",
    avatar: "",
    friends: [],
    logIn: false,
});
const { Provider } = StoreContext;

const reducer = (state, action) => {
    switch (action.type) {
        case loggedIn:
            return [
                ...state,
                {
                    id: state.length * Math.random(),
                    db_ID: action.db_ID,
                    name: action.name,
                    email: action.email,
                    avatar: action.avatar,
                    logIn: true,
                }
            ];
        case signedIn:
            return [
                ...state,
                {
                    id: state.length * Math.random(),
                    db_ID: action.db_ID,
                    name: action.name,
                    email: action.email,
                    avatar: action.avatar,
                }
            ];
        case updateUser:
            return [
                ...state,
                {
                    friends: action.friends,
                }
            ];
        // case GET_USER_ID:
        //     return {
        //         ...state,
        //         userId: [action.user, ...state.getId]
        //     };
        default:
            return state;
    }
};

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return <Provider value={[state, dispatch]}{...props} />
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };