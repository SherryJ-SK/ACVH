import React from "react";
import { Card } from "react-bootstrap";
import "../styles/Card.css";
import { FaHeart } from "react-icons/fa";

function Cards(props) {
    return (
        <Card>
            <Card.Img variant="top" src={props.image} className="card-img-top" alt={props.name} />
            <Card.Body className="card-body">
                <Card.Title className="card-title">{props.name}</Card.Title>
                <hr />
                <Card.Text className="card-text" id={props.gender}>{props.gender}
                    <i className="fa fa-venus"></i></Card.Text>
                <Card.Text className="card-text">Species: {props.species}</Card.Text>
                <Card.Text className="card-text">DOB: {props.bd}</Card.Text>
                <button
                    type="button"
                    className="likeBtn"
                    // onClick={() => { props.addFavoFunc(props.alt) }}
                >
                    <FaHeart />
                </button>
            </Card.Body>
        </Card>
    )
};

export default Cards;