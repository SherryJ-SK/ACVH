import React from "react";
// import { Card } from "react-bootstrap";
import "../styles/Card.css";
// import { FaHeart } from "react-icons/fa";

function Cards(props) {
    return (
        // <Card>
        //     <Card.Img variant="top" src={props.image} className="card-img-top" alt={props.name} />
        //     <Card.Body className="card-body">
        //         <Card.Title className="card-title">{props.name}</Card.Title>
        //         <hr />
        //         <Card.Text className="card-text" id={props.gender}>{props.gender}</Card.Text>
        //         <Card.Text className="card-text">Species: {props.species}</Card.Text>
        //         <Card.Text className="card-text">DOB: {props.bd}</Card.Text>
        //         <button
        //             type="button"
        //             className="likeBtn"
        //         // onClick={() => { props.addFavoFunc(props.alt) }}
        //         >
        //             <FaHeart />
        //         </button>
        //     </Card.Body>
        // </Card>
        <div className="col s12 m6 cardDeck">
            <div className="card">
                <div className="card-image">
                    <img className="card-img-top" src={props.image} alt={props.name} />
                    <a className="btn-floating halfway-fab waves-effect waves-light amber">
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