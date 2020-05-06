import React, { useState, useEffect } from "react";
// import { Form, Button } from "react-bootstrap";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";

function Friend() {
    const [searchNewEmail, setSearchNewEmail] = useState();
    const [searchId, setSearchId] = useState();
    const [searchName, setSearchName] = useState();
    const [textContent, setTextContent] = useState();
    const [friendExist, setFriendExist] = useState(false);
    const [friendList, setFriendList] = useState([]);
    const [listShow, setListShow] = useState(false);
    const [receiverId, setReceiverId] = useState();
    const [receiverName, setReceiverName] = useState();
    const [messageSection, setMessageSection] = useState(false);

    const [state, dispatch] = useStoreContext();
    const id = state.map((item) => { return item.db_ID });
    const name = state.map((item) => { return item.name });

    useEffect(() => {
        foundMyFriend()
    }, []);

    function checkEmailSubmit(event) {
        event.preventDefault();
        if (!searchNewEmail) {
            alert("Enter your friend's Email~")
        } else {
            searchEmail(searchNewEmail);
        }
    };

    function searchEmail(email) {
        API.getUser(email)
            .then(res => {
                // console.log(res);
                if (res.data == null) {
                    alert("No result")
                } else {
                    setListShow(true)
                    setSearchName(res.data.name);
                    setSearchId(res.data._id);
                }
            })
            .catch(err => console.log(err))
    };

    function foundMyFriend() {
        API.getUserId(id)
            .then(res => {
                console.log(res.data.friends);
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
                    <p className="col s4 m2">{friend.friendName}</p>
                    <p className="col s4 m8">{friend.friendEmail}</p>
                    <button
                        className="col s4 m2 btn waves-effect waves-light amber darken-1"
                        onClick={() => {
                            setReceiverId(friend.friendId)
                            setReceiverName(friend.friendName)
                            setMessageSection(true)
                        }}>Send Message</button>
                </li>
            )
        });

    function addFriendClick() {
        API.updateUser(id,
            {
                "$set":
                {
                    "friends":
                    {
                        "friendId": searchId,
                        "friendName": searchName,
                        "friendEmail": searchNewEmail,
                    }
                }
            })
            .then(res => console.log(res))
            .then(setListShow(false))
            .catch(err => console.log(err))
    };

    // send message to friend
    function senderPart(event) {
        event.preventDefault();
        if (!textContent) {
            alert("Please left some messages")
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
                .then(res => console.log(res.data))
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
            <form id="friendForm" className="infoDiv" onSubmit={checkEmailSubmit}>
                <h5>
                    Search a new villiager
                </h5>
                {/* <Form.Group> */}
                <input
                    type="text"
                    name="name"
                    placeholder="Friend's email"
                    onChange={event => setSearchNewEmail(event.target.value)} />
                {/* </Form.Group> */}
                <button
                    className="btn waves-effect waves-light amber darken-1"
                    variant="warning" type="submit" value="Submit">
                    Search
                </button>
                <hr />
                <ul className="infoDiv" style={{ display: listShow ? "block" : "none" }}>
                    <li className="row">
                        {/* <img className="col-md-2" src={searchAva} alt={searchName} /> */}
                        <p className="col s4 m2">{searchName}</p>
                        <p className="col s4 m8">{searchNewEmail}</p>
                        <button
                            id="friendAddbtn"
                            className="col s4 m2 btn waves-effect waves-light amber darken-1"
                            onClick={addFriendClick}>Add</button>
                    </li>
                </ul>
            </form>
        </div>
    )
};

export default Friend;