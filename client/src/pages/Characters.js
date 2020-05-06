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
            <div className="infoDiv row" id="searchVillager">
                <form className="col s12 m4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Check villager details"
                        onChange={event => setOneVill(event.target.value)}
                    ></input>
                    <button
                        onClick={foundOneVill}
                    > Check </button>
                </form>
                {showCard ? (
                    <div className="col s12 m8">
                        <img id="singleCardImg" variant="top" src={cardContent.image} alt={cardContent.name}></img>
                        <div>
                            <p>{cardContent.name}</p>
                            <p>{cardContent.gender}</p>
                            <p>Species: {cardContent.species}</p>
                            <p>DOB: {cardContent.birthday}({cardContent.sign})</p>
                            <p>{cardContent.quote}</p>
                            <p>Catchphrase: {cardContent.phrase}</p>
                            <p>Siblings: {cardContent.siblings}</p>
                            <p>Goal: {cardContent.goal}</p>
                        </div>
                    </div>
                ) : (
                        <div>
                        </div>
                    )}
            </div>
        </div >

    )
};

export default Character;