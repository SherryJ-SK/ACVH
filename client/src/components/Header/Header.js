import React from "react";
import "../styles/Header.css";

function Header() {
    return (
        <div id="content" className="row">
            <p className="headerName col-md-10">Villager Handbook</p>
            <div className="timeSection col-md-2">Time:</div>
        </div>
    )
};

export default Header;