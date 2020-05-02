import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import { useStoreContext } from "../../utils/GlobalState";
// import API from "../../utils/API";

function Sidebar() {
    const [state, dispatch] = useStoreContext();

    console.log("sidebar line 30");

    return (
        <nav id="sidebar" >
            {state.map((item) => {
                return (
                    <div key={item.db_ID}>
                        <div className="sidebar-header">
                            <div >
                                <img className="userPhoto" src={item.avatar} alt="userIcon"></img>
                                <p className="userName">{item.name}</p>
                            </div>
                        </div>
                        <ul className="list-unstyled components">
                            <li className="active ribbon">
                                <Link to={"/home/" + item.db_ID}>
                                    Home
                            </Link>
                            </li>
                            <li className="active ribbon">
                                <Link to={"/characters/" + item.db_ID}>
                                    Characters
                            </Link>
                            </li>
                            {/* <li className="ribbon">
                    <Link to="/memo">
                        Memo
                            </Link>
                </li> */}
                            <li className="ribbon">
                                <Link to={"/collention/" + item.db_ID}>
                                    My Collection
                            </Link>
                            </li>
                            <li className="ribbon">
                                <Link to={"/friends/" + item.db_ID}>
                                    My Friends
                            </Link>
                            </li>
                        </ul>
                    </div>
                )
            })}
            <hr />
            <div>
                <img id="driftBottle" src="assets/images/bottleIcons.png" alt="driftBottle">
                </img>
            </div>
        </nav>
    );
};


export default Sidebar;