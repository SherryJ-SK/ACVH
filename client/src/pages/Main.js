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
            <InfoDiv id="memo">
                <h5>
                    Welcome aboard! Here is some useful tips for new Villagers!
                </h5>
                <ul>
                    <li>
                        <span className="iconList" role="img" aria-label="bear">🐻</span>
                        Charaters  : Here to check out charaters' information </li>
                    <li>
                        <span className="iconList" role="img" aria-label="mag">🔍</span>
                        Search Friends  : Connect with your friend by searching their email addresses</li>
                    <li>
                        <span className="iconList" role="img" aria-label="two_women_holding_hands">👭</span>
                        My Friends  : View your friend list and send them messages with love</li>
                    <li>
                        <span className="iconList" role="img" aria-label="love_letter">💌</span>
                        Drift Bottle Icon  : See all the messages from your friends</li>
                </ul>
            </InfoDiv>
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
        </div>
    )
};

export default Main;