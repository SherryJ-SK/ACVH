import React, { useEffect, useState } from "react";
import API from "../utils/API";
import InfoDiv from "../components/InfoDiv/InfoDiv";
// import { useSelector } from "react-redux";


function Main() {
    // const loginState = useSelector(state => state.isLogged);

    const [events, setEvents] = useState([]);
    const [singleEvent, setSingleEvent] = useState([]);
    const [eventImg, setEventImg] = useState([]);

    useEffect(() => {
        todayEvent()
    }, [])

    function todayEvent() {
        API.getEvent()
            .then(res => {
                setEvents(res.data.message)
                setSingleEvent(res.data.events)
                setEventImg(res.data.villager_images)
            })
            .catch(err => console.log(err));
    }

    return (
        <div id="main">
            <InfoDiv id="dailyEvent">
                <p>{events}</p>
                {singleEvent.map(event => {
                    return (<p key={event} className="col-md-8" id="eventName">{event}
                        <span role="img" aria-label="tada">🎉</span></p>)
                })}
                {eventImg.map(img => {
                    return (<img key={img} className="col-md-4" id="eventPic" src={img} alt={img} />
                    )
                })}
            </InfoDiv>
            <InfoDiv id="memo">
                <p>
                    Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
            </InfoDiv>
        </div>
    )
};

export default Main;