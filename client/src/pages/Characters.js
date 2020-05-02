import React, { useState, useEffect } from "react";
import Cards from "../components/Cards/Cards";
import { CardDeck } from "react-bootstrap";
import API from "../utils/API";

function Character() {
    const [villager, setVillager] = useState([]);
    // var state = {
    //     villagerList: villagerList,
    //     found: []
    // }

    useEffect(() => {
        API.getPromise()
            // console.log(API.allVillager())
            .then(values =>
                console.log(values + "line20"))
    }, []);

    function getVillager() {
        API.getPromise()
            // console.log(API.allVillager())
            .then(values =>
                console.log(values + "line20"))
        //     // JSON.stringify(values[0].name)
        // )
        // console.log(JSON.stringify(API.vArray))
        // .then(values =>
        //     console.log(values + "line 34"))
        // API.getVillager()
        //     .then(res => {
        //         setVillager(res.data);
        //     })
        //     .catch(err => console.log(err));
    };

    return (
        <div id="character">
            <CardDeck >
                <Cards
                    name={villager.name}
                    image={villager.image}
                    gender={villager.gender}
                    species={villager.species}
                    bd={villager.birthday}
                />
                <Cards
                    name={villager.name}
                    image={villager.image}
                    gender={villager.gender}
                    species={villager.species}
                    bd={villager.birthday}
                />
                <Cards
                    name={villager.name}
                    image={villager.image}
                    gender={villager.gender}
                    species={villager.species}
                    bd={villager.birthday}
                />
                <Cards
                    name={villager.name}
                    image={villager.image}
                    gender={villager.gender}
                    species={villager.species}
                    bd={villager.birthday}
                />
                <Cards
                    name={villager.name}
                    image={villager.image}
                    gender={villager.gender}
                    species={villager.species}
                    bd={villager.birthday}
                />
                <Cards
                    name={villager.name}
                    image={villager.image}
                    gender={villager.gender}
                    species={villager.species}
                    bd={villager.birthday}
                />
            </CardDeck>
            {/* <CardDeck>
                <Cards
                    name={villager.name}
                    image={villager.image}
                    gender={villager.gender}
                    species={villager.species}
                    bd={villager.birthday}
                />
            </CardDeck> */}
        </div>
    )
};

export default Character;