import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../styles/Login.css";
import { Form, Button } from "react-bootstrap";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import UserAvatar from "../UserAvatar/UserAvatar";
import avatarJSON from "../../utils/avatar.json";
import { loggedIn } from "../../utils/actions";

function Register() {
    const history = useHistory();
    const [state, dispatch] = useStoreContext();
    const [userUpdate, setUserUpdate] = useState(true);
    const [useremail, setUseremail] = useState();
    const [userId, setUserId] = useState();
    const [password, setPassword] = useState();
    const [userName, setUserName] = useState();
    const [selectedAva, setSeletedAva] = useState();

    // user submit login info
    const handleSubmit = event => {
        event.preventDefault();
        if (!useremail) {
            alert("Please enter your email address");
        } else if (!password) {
            alert("Please enter password");
        } else {
            loginUser(useremail, password);
        };
    };

    // pass login info to BE
    function loginUser(email, password) {
        API.getUser(email)
            .then(res => {
                if (res.data == null) {
                    axios.post("/api/auth/register_login", {
                        email: email,
                        password: password
                    })
                        .then(res => {
                            setUserUpdate(false)
                            setUserId(res.data.sucess)
                        })
                        .catch(err => console.log(err))
                } else if (res.data.email === email)
                    alert("This email has been used, please use another one")
            })
            .catch(err => console.log(err))
    };

    // user information update
    const handleSelection = value => e => {
        console.log(value);
        setSeletedAva(value);
    };

    // get images from JSON file and display in component
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

    // store updated information to the userId registered
    function handleUpdate(event) {
        event.preventDefault();
        if (!userName && !selectedAva) {
            alert("Please enter name and choose an avatar")
        } else if (!userName) {
            alert("Please enter name")
        } else if (!selectedAva) {
            alert("Please choose an avatar")
        } else {
            // console.log(userName);
            // console.log(selectedAva);
            // console.log(userId);
            API.updateUser(userId,
                {
                    "$set":
                    {
                        "name": userName,
                        "avatar": selectedAva
                    }
                })
                .then(res => console.log(res.data))
                .then(() => {
                    dispatch({
                        type: loggedIn,
                        db_ID: userId,
                        name: userName,
                        email: useremail,
                        avatar: selectedAva,
                    });
                    history.push("/home/" + userId);
                })
                .catch(err => console.log(err))
        }
    };

    return (
        <div>
            {userUpdate ? (<div id="loginSection" className="row">
                <div className="col-md-6">
                    <img className="tommyImage" src="assets/images/Timmy_&_Tommy_NH.png" alt="loginNook"></img>
                </div>
                <div className="col-md-2 loginFormSection">
                    <h4>Register</h4>
                    <br />
                    <Form id="loginForm" onSubmit={handleSubmit}>
                        <Form.Label>Email:</Form.Label><br />
                        <Form.Control
                            type="text"
                            id="email"
                            placeholder="Email"
                            onChange={event => setUseremail(event.target.value)}
                        />
                        <Form.Label>Password:</Form.Label><br />
                        <Form.Control
                            type="password"
                            id="password"
                            placeholder="Password"
                            onChange={event => setPassword(event.target.value)}
                        />
                        <br />
                        <Button
                            variant="warning"
                            type="submit"
                            value="Submit"
                            id="btn"
                        >
                            Submit
                    </Button>
                    </Form>
                    <hr />
                    <p>Already signed in?
                    <br />
                        <Link to="/login">
                            Login here
                    </Link>
                    </p>
                </div>
            </div>) : (
                    <div id="newUserForm" >
                        <Form onSubmit={handleUpdate}>
                            <h3>Villager Basic Information</h3>
                            <p>Hello {userName}</p>
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
            }
        </div>
    )
};

export default Register;