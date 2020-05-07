import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";

function Sidebar() {
    const [state, dispatch] = useStoreContext();
    const [userName, setUserName] = useState();
    const id = state.map((item) => { return item.db_ID });

    // console.log("sidebar line 30");

    useEffect(() => {
        getUserName();
    }, []);

    function getUserName() {
        API.getUserId(id)
            .then(res => {
                // console.log(res.data)
                setUserName(res.data.name)
            })
            .catch(err => console.log(err))
    };

    return (
        <nav id="sidebar" >
            <div>
                {state.map((item) => {
                    return (
                        <div key={item.id} className="sidebar-header">
                            <div >
                                <img className="userPhoto" src={item.avatar} alt="userIcon"></img>
                                <p className="userName">{userName}</p>
                            </div>
                        </div>
                    )
                })}
                <ul className="list-unstyled components">
                    <li className="ribbon">
                        <Link className="sidebarLink" to={"/home/" + id}>
                            Home
                            </Link>
                    </li>
                    <li className="ribbon">
                        <Link className="sidebarLink" to={"/characters/" + id}>
                            Characters
                            </Link>
                    </li>
                    <li className="ribbon">
                        <Link className="sidebarLink" to={"/search_friend/" +id}>
                            Search Friend
                            </Link>
                    </li>
                    {/* <li className="ribbon">
                        <Link to={"/collention/" + id}>
                            My Collection
                            </Link>
                    </li> */}
                    <li className="ribbon">
                        <Link className="sidebarLink" to={"/friends/" + id}>
                            My Friends
                            </Link>
                    </li>
                </ul>
            </div>
            <hr />
            <div>
                <Link to={"/drift_bottle/" + id}>
                    <img id="driftBottle" src="assets/images/bottleIcons.png" alt="driftBottle">
                    </img>
                </Link>
            </div>
        </nav>
    );
};


export default Sidebar;