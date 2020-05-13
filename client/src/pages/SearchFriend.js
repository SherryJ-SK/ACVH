import React, { useState } from "react";
import M from "materialize-css";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";

function SearchFriend() {
    const [searchNewEmail, setSearchNewEmail] = useState();
    const [searchId, setSearchId] = useState();
    const [searchName, setSearchName] = useState();
    const [listShow, setListShow] = useState(false);
    const [state, dispatch] = useStoreContext();
    const id = state.map((item) => { return item.db_ID });

    function checkEmailSubmit(event) {
        event.preventDefault();
        if (!searchNewEmail) {
            // alert("Enter your friend's Email~")
            M.toast({ html: "Enter your friend's Email~", classes: 'rounded' });
        } else {
            searchEmail(searchNewEmail);
        }
    };

    function searchEmail(email) {
        API.getUser(email)
            .then(res => {
                // console.log(res);
                if (res.data == null) {
                    // alert("No result")
                    M.toast({ html: 'No Result', classes: 'rounded' });
                } else {
                    setListShow(true)
                    setSearchName(res.data.name);
                    setSearchId(res.data._id);
                }
            })
            .catch(err => console.log(err))
    };

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
            .then(() => {
                setListShow(false);
                M.toast({ html: 'New friend has been added', classes: 'rounded' });
            })
            .catch(err => console.log(err))
    };

    return (
        <div>
            <form id="friendForm" className="infoDiv" onSubmit={checkEmailSubmit}>
                <h5>
                    Search a new friend
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
                {listShow ?
                    (<ul className="infoDiv">
                        <li className="row">
                            {/* <img className="col-md-2" src={searchAva} alt={searchName} /> */}
                            <p className="col s2">{searchName}</p>
                            <p className="col s8">{searchNewEmail}</p>
                            <button
                                id="friendAddbtn"
                                className="btn waves-effect waves-light amber darken-1"
                                onClick={addFriendClick}>Add</button>
                        </li>
                    </ul>
                    ) : (
                        <div></div>
                    )}
            </form>
        </div>
    )
};

export default SearchFriend;