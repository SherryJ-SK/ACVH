import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/Header.css";

function Header() {
    const history = useHistory();
    function handleLogOut() {
        history.push("/");
        window.location.reload(false);
    };

    return (
        <div id="content" className="row">
            <p className="headerName col m12">Villager Handbook</p>
            <div className="logoutSection">
                <img
                    id="logoutImg"
                    src="assets/images/tree.png"
                    alt="logoutSign"
                    onClick={handleLogOut}
                />
                <p>Log out</p>
            </div>
        </div>
    )
};

export default Header;