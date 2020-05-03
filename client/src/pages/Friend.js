import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import { updateUser } from "../utils/actions";

function Friend() {
    const [searchNewEmail, setSearchNewEmail] = useState();
    const [searchAva, setSearchAva] = useState();
    const [searchName, setSearchName] = useState();
    const [friendExist, setFriendExist] = useState(false);
    const [listShow, setListShow] = useState(false);

    const [state, dispatch] = useStoreContext();
    const id = state.map((item) => { return item.db_ID });

    useEffect(() => {
        foundMyFriend()
    },[]);

    function checkEmailSubmit(event) {
        event.preventDefault();
        if (!searchNewEmail) {
            alert("Enter your friend's Email~")
        } else {
            searchEmail(searchNewEmail);
            setListShow(true);
        }
    };

    function searchEmail(email) {
        API.getUser(email)
            .then(res => {
                console.log(res);
                setSearchAva(res.data.avatar);
                setSearchName(res.data.name);
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
                    // return (fArray.map((friend) => {
                    //     dispatch({
                    //         type: updateUser,
                    //         friends: friend
                    //     });
                    // }))
                } else {
                    console.log("nope");
                }
            })
            .catch(err => console.log(err))
    };

    // foundMyFriend();

    // const friends = state.map((item) => { return item.friends });
    // console.log(friends);

    function addFriendClick() {
        API.updateUser(id,
            {
                "$set":
                {
                    "friends":
                    {
                        "friendName": searchName,
                        "friendEmail": searchNewEmail,
                        "friendAva": searchAva
                    }
                }
            })
            .then(res => console.log(res))
            .then(setListShow(false))
            .catch(err => console.log(err))
    };

    return (
        <div>
            <div id="friendForm" className="infoDiv">
                <p>My Friends</p>
                <hr />
                <p style={{ display: friendExist ? "none" : "block" }}>
                    <span role="img" aria-label="notes">🎶</span>
                        It's time to make some new friends</p>
                <ul >
                    {/* {state.map((item) => (
                        <li key={item.friends.friendName} className="row">
                            <img className="col-md-2" src={item.friends.friendAva} alt={item.friends.friendName} />
                            <p className="col-md-4">{item.friends.friendName}</p>
                            <p className="col-md-4">{item.friends.friendEmail}</p>
                            <Button className="col-md-2">Remove</Button>
                        </li>
                    ))} */}
                </ul>
            </div>
            <Form id="friendForm" className="infoDiv" onSubmit={checkEmailSubmit}>
                <h5>
                    Search a friend
                </h5>
                <Form.Group>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Friend's email"
                        onChange={event => setSearchNewEmail(event.target.value)} />
                </Form.Group>
                <Button variant="warning" type="submit" value="Submit">
                    Search
                </Button>
                <ul className="infoDiv" style={{ display: listShow ? "block" : "none" }}>
                    <li className="row">
                        <img className="col-md-2" src={searchAva} alt={searchName} />
                        <p className="col-md-2">{searchName}</p>
                        <p className="col-md-6">{searchNewEmail}</p>
                        <Button className="col-md-2" onClick={addFriendClick}>Add</Button>
                    </li>
                </ul>
            </Form>
        </div>
    )
};

export default Friend;