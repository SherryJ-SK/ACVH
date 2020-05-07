import React, { useState, useEffect } from "react";
// import { Form, Button } from "react-bootstrap";
import M from "materialize-css";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";

function Friend() {
    const [textContent, setTextContent] = useState();
    const [friendExist, setFriendExist] = useState(false);
    const [friendList, setFriendList] = useState([]);
    const [receiverId, setReceiverId] = useState();
    const [receiverName, setReceiverName] = useState();
    const [messageSection, setMessageSection] = useState(false);

    const [state, dispatch] = useStoreContext();
    const id = state.map((item) => { return item.db_ID });
    const name = state.map((item) => { return item.name });

    useEffect(() => {
        foundMyFriend()
    },[]);

    function foundMyFriend() {
        API.getUserId(id)
            .then(res => {
                // console.log(res.data.friends);
                const fArray = res.data.friends;
                if (Array.isArray(fArray) && fArray.length) {
                    setFriendExist(true);
                    setFriendList(fArray);
                } else {
                    console.log("nope");
                }
            })
            .catch(err => console.log(err))
    };

    const displayFriends =
        friendList.map(friend => {
            return (
                <li className="row"
                    key={friend._id}>
                    <p className="col s2">{friend.friendName}</p>
                    <p className="col s8">{friend.friendEmail}</p>
                    <button
                        className="btn waves-effect waves-light amber darken-1"
                        onClick={() => {
                            setReceiverId(friend.friendId)
                            setReceiverName(friend.friendName)
                            setMessageSection(true)
                        }}>Send Message</button>
                </li>
            )
        });

    // send message to friend
    function senderPart(event) {
        event.preventDefault();
        if (!textContent) {
            // alert("Please left some messages")
            M.toast({ html: 'Please left some messages', classes: 'rounded' });
        } else {
            // console.log(receiverId);
            console.log(name[0]);
            API.updateUser(receiverId,
                {
                    "$set":
                    {
                        "driftBottle":
                        {
                            "senderId": id[0],
                            "senderName": name[0],
                            "context": textContent,
                            "receiverId": receiverId,
                        }
                    }
                })
                .then(res => {
                    console.log(res.data);
                    setMessageSection(false);
                })
                .catch(err => console.log(err))
        }
    };

    return (
        <div>
            <div id="friendForm" className="infoDiv">
                <h5>My Friends</h5>
                <hr />
                <p style={{ display: friendExist ? "none" : "block" }}>
                    <span role="img" aria-label="notes">🎶</span>
                    It's time to make some new friends</p>
                <ul >
                    {displayFriends}
                </ul>
            </div>
            {messageSection ?
                (<div id="messageContent">
                    <form onSubmit={senderPart}>
                        <p>To {receiverName}</p>
                        <textarea
                            placeholder="Share something"
                            onChange={event => setTextContent(event.target.value)}
                        />
                        <button
                            className="btn waves-effect waves-light amber darken-1"
                            type="submit"
                            value="Submit"
                        >
                            Send</button>
                    </form>
                </div>
                ) : (
                    <div></div>
                )}
        </div>
    )
};

export default Friend;