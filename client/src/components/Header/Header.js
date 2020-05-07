import React from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import { loggedIn } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import "../styles/Header.css";

function Header() {
    const history = useHistory();
    const [state, dispatch] = useStoreContext();
    // var toastHTML = '<span>Do you want to log out?</span><button class="btn-flat toast-action">Yes</button>';
    function handleLogOut() {
        // M.toast({ html: toastHTML })
        window.location.reload(false);
        history.push("/login");
    };

    return (
        <div id="content" className="row">
            <p className="headerName col m12">Villager Handbook</p>
            <div className="logoutSection">
                <img
                    id="logoutImg"
                    src="assets/images/tree.png"
                    alt="logoutSign"
                    onClick={handleLogOut}
                />
                <p>Log out</p>
            </div>
        </div>
    )
};

export default Header;