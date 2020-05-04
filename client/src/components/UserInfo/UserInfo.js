import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import UserAvatar from "../UserAvatar/UserAvatar";
import "../styles/UserInfo.css";
import avatarJSON from "../../utils/avatar.json";
import API from "../../utils/API";
import { signedIn } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

function UserInfo() {
    const [state, dispatch] = useStoreContext();
    const history = useHistory();

    const [name, setUserName] = useState();
    const [selectedAva, setSeletedAva] = useState();

    const handleSelection = value => e => {
        console.log(value);
        setSeletedAva(value);
    }

    const userInfo =
        avatarJSON.map(ava => {
            // console.log({ ava })
            return (
                < UserAvatar
                    key={ava.data_id}
                    number={ava.data_id}
                    image={ava.imageSrc}
                    name={ava.imageAlt}
                    foundId={handleSelection(ava.imageSrc)}
                />
            )
        });

    function handleSubmit(event) {
        event.preventDefault();
        if (!name && !selectedAva) {
            alert("Please enter name and choose an avatar")
        } else if (!name) {
            alert("Please enter name")
        } else if (!selectedAva) {
            alert("Please choose an avatar")
        } else {
            console.log(name);
            console.log(selectedAva);

            const id = state.map((item) => { return item.db_ID });
            console.log(id);
            API.updateUser(id,
                {
                    "$set":
                    {
                        "name": name,
                        "avatar": selectedAva
                    }
                })
                .then(res => console.log(res.data))
                .then(() => {
                    // dispatch({
                    //     type: signedIn,
                    //     name: name,
                    //     avatar: selectedAva,
                    // });
                    history.push("/home/" + id);
                })
                .catch(err => console.log(err))
        }
    };

    return (
        <div id="newUserForm" >
            <Form onSubmit={handleSubmit}>
                <h3>Villager Basic Information</h3>
                <p>Hello {name}</p>
                <Form.Group controlId="username">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        onChange={event => setUserName(event.target.value)}
                        name="name"
                    />
                </Form.Group>
                <Form.Group controlId="avatar">
                    <Form.Label>Avatar</Form.Label>
                </Form.Group>
                <Form.Group>
                    {userInfo}
                </Form.Group>
                <Button
                    variant="warning"
                    type="submit"
                >
                    Save</Button>
            </Form>
        </div >
    )
};


export default UserInfo;