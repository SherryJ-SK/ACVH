import React, { useState } from "react";
import { useStoreContext } from "../utils/GlobalState";


function DriftBottle() {
    const [state, dispatch] = useStoreContext();
    //sender part form
    // get sender ID, receiver email and message --> update to receiver's DB
    const id = state.map((item) => { return item.db_ID });
    const [receiverEmail, setReceiverEmail] = useState();
    const [textContent, setTextContent] = useState();
    function senderPart(event) {
        event.preventDefault();
        if (!receiverEmail && !textContent) {
            alert("Please enter your friend's email, and left some messages")
        } else if (!receiverEmail) {
            alert("Please enter your friend's email")
        } else if (!textContent) {
            alert("Please left some messages")
        } else {
            console.log(receiverEmail);
            console.log(textContent);
        }
    };
    //receiver part list
    // get from the DB, if message render in the list, else NaN
    function handleDel(event) {
        event.preventDefault();
        console.log("clicked");
    }

    return (
        <div id="driftBottle">
            <div id="senderForm" className="col-md-6">
                <form onSubmit={senderPart}>
                    {/* // should do like a drop down box */}
                    <input
                        type="text"
                        placeholder="Enter your friend's email"
                        onChange={event => setReceiverEmail(event.target.value)}
                    />
                    <textarea
                        placeholder="Share something"
                        onChange={event => setTextContent(event.target.value)}
                    />
                    <input
                        type="submit"
                        value="Submit"
                    />
                </form>
            </div>
            <div id="receiverList" className="col-md-6">
                <p>Message List</p>
                <ul>
                    <li>
                        <p>
                            received message here
                        </p>
                        <button
                            onClick={handleDel}
                        >X</button>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default DriftBottle;