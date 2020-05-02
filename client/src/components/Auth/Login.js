import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import { Form, Button } from "react-bootstrap";
import API from "../../utils/API";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { loggedIn } from "../../utils/actions";

function Login() {
    const history = useHistory();
    const [state, dispatch] = useStoreContext();
    const [useremail, setUseremail] = useState();
    const [password, setPassword] = useState();

    // user submit login info
    const handleSubmit = event => {
        event.preventDefault();
        if (!useremail) {
            alert("Please enter your email address");
        } else if (!password) {
            alert("Please enter password");
        } else {
            loginUser(useremail, password)
        };
    };

    // pass login info to BE
    function loginUser(email, password) {
        API.getUser(email)
            .then(res => {
                const avatar = res.data.avatar;
                const nameDB = res.data.name;
                if (res.data.email !== email) {
                    alert("Please register as a new user")
                } else if (res.data.email === email) {
                    axios.post("/api/auth/register_login", {
                        email: email,
                        password: password
                    })
                        .then(res => {
                            console.log(res.data.sucess);
                            dispatch({
                                type: loggedIn,
                                db_ID: res.data.sucess,
                                name: nameDB,
                                email: email,
                                avatar: avatar,
                            });            
                            history.push("/home/" + res.data.sucess);
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    };

    return (
        <div id="loginSection" className="row">
            <div className="col-md-6">
                <img className="nookImage" src="assets/images/nook4.png" alt="loginNook"></img>
            </div>
            <div className="col-md-2 loginFormSection">
                <h4>Login</h4>
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
                <p>Haven't register yet?
                    <br />
                    <Link to="/register">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;