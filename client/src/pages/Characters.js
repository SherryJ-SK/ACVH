import React, { useState, useEffect } from "react";
import Cards from "../components/Cards/Cards";
// import { CardDeck, Card } from "react-bootstrap";
import API from "../utils/API";

function Character() {
    const [villager, setVillager] = useState([]);
    const [oneVill, setOneVill] = useState();
    const [showCard, setShowCard] = useState(false);
    const [cardContent, setCardContent] = useState();

    useEffect(() => {
        getVillager();
    }, []);

    function getVillager() {
        API.getPromise()
            .then(values => {
                // console.log({ values })
                setVillager(values[0].value)
            })
            .catch(err => console.log(err));
    };

    const displayVillager =
        villager.map(vill => {
            return (
                <Cards
                    key={vill.name}
                    name={vill.name}
                    image={vill.image}
                    gender={vill.gender}
                    species={vill.species}
                    bd={vill.birthday}
                />
            )
        });

    function foundOneVill(event) {
        event.preventDefault();
        API.getVillager(oneVill)
            .then(res => {
                // console.log(res.data);
                setCardContent(res.data);
                setShowCard(true);
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div id="character" className="row">
                {/* <CardDeck > */}
                {displayVillager}
                {/* </CardDeck> */}
            </div>
            <div className="row" id="searchVillager">
                <form className="col s12 m2">
                    <input
                        type="text"
                        name="name"
                        id="searchVform"
                        placeholder="Check villager details"
                        onChange={event => setOneVill(event.target.value)}
                    ></input>
                    <button
                        className="btn waves-effect waves-light amber darken-1"
                        onClick={foundOneVill}
                    > Check </button>
                </form>
                {showCard ? (
                    <div className="col s12 m10">
                        <img className="col s12 m4" id="singleCardImg" variant="top" src={cardContent.image} alt={cardContent.name}></img>
                        <div className="col s12 m6" id="singleVinfo">
                            <p>Name: {cardContent.name}</p>
                            <p>Gender: {cardContent.gender}</p>
                            <p>Species: {cardContent.species}</p>
                            <p>DOB: {cardContent.birthday}({cardContent.sign})</p>
                            <p>{cardContent.quote}</p>
                            <p>Catchphrase: {cardContent.phrase}</p>
                            {/* <p>Siblings: {cardContent.siblings}</p> */}
                            <p>Goal: {cardContent.goal}</p>
                        </div>
                    </div>
                ) : (
                        <div className="col s12 m10">
                        </div>
                    )}
            </div>
        </div >

    )
};

export default Character;