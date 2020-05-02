import React from "react";

function InfoDiv(props) {
    return (
        <div className="infoDiv row" id={props.id}>
            {props.children}
        </div>
    )
};

export default InfoDiv;