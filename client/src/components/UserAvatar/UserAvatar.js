import React from "react";
import "../styles/UserInfo.css";

function UserAvatar(props) {
    return (
        <img
            className="avatarGroup"
            src={props.image}
            alt={props.name}
            data-id={props.number}
            onClick={() => { props.foundId(props.src) }}
        ></img>
    )
};

export default UserAvatar;