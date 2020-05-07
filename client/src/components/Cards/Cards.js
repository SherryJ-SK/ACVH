import React from "react";
import "../styles/Card.css";

function Cards(props) {
    return (
        <div className="col s12 m6 cardDeck">
            <div className="card">
                <div className="card-image">
                    <img className="card-img-top" src={props.image} alt={props.name} />
                    <a className="btn-floating halfway-fab waves-effect waves-light amber" href="#">
                        <i className="material-icons">❤</i></a>
                </div>
                <div className="card-content">
                    <span className="card-title">{props.name}</span>
                    <p id={props.gender}>{props.gender}</p>
                    <p>Species: {props.species}</p>
                    <p>DOB: {props.bd}</p>
                </div>
            </div>
        </div>

    )
};

export default Cards;