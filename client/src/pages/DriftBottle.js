import React, { useState, useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

function DriftBottle() {
    const [state, dispatch] = useStoreContext();
    //sender part form
    // get sender ID, receiver email and message --> update to receiver's DB
    const id = state.map((item) => { return item.db_ID });
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        searchEmail()
    })

    function searchEmail() {
        API.getUserId(id)
            .then(res => {
                // console.log(res.data.driftBottle);
                const bottleArray = (res.data.driftBottle);
                if (Array.isArray(bottleArray) && bottleArray.length) {
                    // console.log("have received message");
                    setMessageList(bottleArray);
                } else {
                    console.log("empty array");
                }
            })
            .catch(err => console.log(err))
    };

    //receiver part list
    // get from the DB, if message render in the list, else NaN
    // function handleDel(event) {
    //     event.preventDefault();
    //     console.log("clicked");
    // };

    const displayMessage =
        messageList.map(message => {
            return (
                <li
                    className="messageList"
                    key={message.senderId}>
                    <p
                        style={{ "fontSize": "1.1rem" }}
                    >From: {message.senderName}</p>
                    <p
                        className="messageText"
                    >{message.context}</p>
                    {/* <p>{message.date}</p> */}
                    {/* <button
                        className="btn waves-effect waves-light amber darken-1"
                        onClick={handleDel}
                    >X</button> */}
                </li>
            )
        })


    return (
        <div id="driftBottle">
            <div id="receiverList">
                <h5>Message List</h5>
                <hr />
                <ul>
                    {displayMessage}
                </ul>
            </div>
        </div>
    )
};

export default DriftBottle;