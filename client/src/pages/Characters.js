import React, { useState, useEffect } from "react";
import Cards from "../components/Cards/Cards";
import { CardDeck } from "react-bootstrap";
import API from "../utils/API";
import { STATES } from "mongoose";

function Character() {
    const [villager, setVillager] = useState([]);
    // var state = {
    //     villagerList: villagerList,
    //     found: []
    // }

    useEffect(() => {
        getVillager();
    }, []);

    function getVillager() {
        API.getPromise()
            .then(values => {
                // console.log({values})
                let status = values.status
                // console.log({status})
                console.log(values[0].value[0])
                // console.log(values.value[0])
            })
            //     // JSON.stringify(values[0].name)
            // )
            // console.log(JSON.stringify(API.vArray))
            // .then(values =>
            //     console.log(values + "line 34"))
            // API.getVillager()
            // .then(res => {
            //     // store into redux 
            //     setVillager(res.data);
            // })
            .catch(err => console.log(err));
    };

    // const handleFavoClick = value => e => {
    //     console.log(value);
    // };

    // function addFavo() {
    //     return (
    //         <Cards
    //             name={villager.name}
    //             image={villager.image}
    //             gender={villager.gender}
    //             species={villager.species}
    //             bd={villager.birthday}
    //             addFavoFunc={handleFavoClick(villager.name)}
    //         />
    //     )
    // };

    return (
        <div id="character">
            {/* {state.characters.length ? ( */}
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
            {/* ) : (
            <div>Loading...</div>
            )} */}
        </div>
    )
};

export default Character;