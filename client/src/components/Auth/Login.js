import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
// import { Form, Button } from "react-bootstrap";
import M from "materialize-css";
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
            // alert("Please enter your email address");
            M.toast({html: 'Please enter your email address', classes: 'rounded'});
        } else if (!password) {
            // alert("Please enter password");
            M.toast({html: 'Please enter password', classes: 'rounded'});
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
                    // alert("Please register as a new user");
                    M.toast({html: 'Please register as a new user', classes: 'rounded'});
                } else if (res.data.email === email) {
                    // console.log("login line 38");
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
            <div>
                <img className="nookImage" src="assets/images/nook4.png" alt="loginNook"></img>
            </div>
            <div className="loginFormSection">
                <h4>Login</h4>
                <br />
                <form id="loginForm" onSubmit={handleSubmit}>
                    {/* <Form.Label>Email:</Form.Label><br /> */}
                    {/* <Form.Control
                        type="text"
                        id="email"
                        placeholder="Email"
                        onChange={event => setUseremail(event.target.value)}
                    /> */}
                    {/* <Form.Label>Password:</Form.Label><br /> */}
                    {/* <Form.Control
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={event => setPassword(event.target.value)}
                    /> */}
                    <div className="input-field">
                        <input id="email" type="email" className="validate"
                            onChange={event => setUseremail(event.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input id="password" type="password" className="validate"
                            onChange={event => setPassword(event.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <br />
                    <button
                        className="btn waves-effect waves-light amber darken-1"
                        type="submit"
                        name="action"
                        value="Submit"
                        id="btn"
                    >
                        Submit
                    </button>
                </form>
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