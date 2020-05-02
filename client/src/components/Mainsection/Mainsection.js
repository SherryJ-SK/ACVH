import React from "react";
import "../styles/Mainsection.css";

function Mainsection(props) {
    return (
        <div id="mainSection" className="row">{props.children}
        </div>
    );
};

export default Mainsection;