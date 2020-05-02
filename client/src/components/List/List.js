import React from "react";
import { Button } from "react-bootstrap";

function List(props) {
    return (
        <ul className="infoDiv" style={{ display: props.listShow ? "block" : "none" }}>
            <li className="row">
                <img className="col-md-2" src={props.avatar} alt={props.name} />
                <p className="col-md-2">{props.name}</p>
                <p className="col-md-6">{props.email}</p>
                <Button className="col-md-2" onClick={props.addFunc()}>Add</Button>
            </li>
        </ul>
    )
};

export default List;