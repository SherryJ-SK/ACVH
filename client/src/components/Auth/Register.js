import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../styles/Login.css";
import { Form, Button } from "react-bootstrap";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { signedIn } from "../../utils/actions";

function Register() {
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
                            // console.log(res.data.sucess)
                            dispatch({
                                type: signedIn,
                                db_ID: res.data.sucess,
                                email: email,
                            });
                            history.push("/update")
                            // history.push("/update/" + res.data.sucess)
                        })
                        .catch(err => console.log(err))
                } else if (res.data.email === email)
                    alert("This email has been used, please use another one")
            })
            .catch(err => console.log(err))
    };

    console.log("register line 55");

    return (
        <div id="loginSection" className="row">
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
        </div>
    )
};

export default Register;