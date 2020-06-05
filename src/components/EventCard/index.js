import React, {Component} from 'react';
import './styles.css'
import { Button } from 'react-bootstrap';
import { format, differenceInMilliseconds } from 'date-fns'
import Timer from "react-compound-timer";

export default class EventCard extends Component {

    render() {
        console.log(this.props.event.partner.length);
        let initTime = 0;
        const dif = differenceInMilliseconds(new Date(`${this.props.event.experience}`), new Date());
        if (dif > 0) {
            initTime = dif;
        } else {
            this.props.closeCard();
            this.props.reloadPins();
            alert("Sorry. Event has ended.")
        }
        const exp = format(new Date(`${this.props.event.experience}`),"dd.MM.yyyy HH:mm").split(" ");
        const expDate = exp[0]
        const expTime = exp[1]
        for(let i = 0; i < this.props.event.partner.length; i++){
            if( this.props.event.partner[i].id === JSON.parse(localStorage.getItem("UserData")).id ){
                this.userExist = true
            }
        }
        const availability = this.props.event.availability - this.props.event.partner.length + "/" +this.props.event.availability

    return (
        <div>
            <div id="sidebar">
                <div className="container">
                    <p className="float-right" style={{padding: "0px",fontSize: "14px",lineHeight: "14px",margin: "3px 0 0 0",textAlign: "right"}}>
                        {expDate}<br/>
                        {expTime}
                    </p>
                    <h5 style={{fontSize: "17px", margin: "30px 0px 0px 0px" }}>
                        {this.props.event.user.fullName}<br/>
                        {this.props.event.type.type}
                        {this.props.event.type.icon}
                        </h5>
                    <p style={{fontSize: "15px", margin: "10px 0px 0px 0px" }}>Event is comming soon:</p>
                    <Timer
                        initialTime={initTime}
                        direction="backward"
                        checkpoints={
                            [{
                                time: 0,
                                callback: () => {
                                    this.props.closeCard();
                                    this.props.reloadPins();
                                },
                            }]
                        }
                    >
                        {() => (
                            <React.Fragment>
                                <div className="Countdown">
                                            <span className="Countdown-col">
                                              <span className="Countdown-col-element">
                                                  <strong><Timer.Days/></strong>
                                                  <span style={{fontSize: "12px"}}>Days</span>
                                              </span>
                                            </span>
                                    <span className="Countdown-col">
                                              <span className="Countdown-col-element">
                                                <strong><Timer.Hours /></strong>
                                                <span style={{fontSize: "12px"}}>Hours</span>
                                              </span>
                                            </span>
                                    <span className="Countdown-col">
                                              <span className="Countdown-col-element">
                                                <strong><Timer.Minutes /></strong>
                                                <span style={{fontSize: "12px"}}>Min</span>
                                              </span>
                                            </span>
                                    <span className="Countdown-col">
                                              <span className="Countdown-col-element">
                                                <strong><Timer.Seconds /></strong>
                                                <span style={{fontSize: "12px"}}>Sec</span>
                                              </span>
                                            </span>
                                </div>
                            </React.Fragment>
                        )}
                    </Timer>
                    <p style={{fontSize: "15px", margin: "0px"}}>Description: {this.props.event.description !== "" ? this.props.event.description : "User hasn't added any description."}</p>
                    <p style={{fontSize: "15px", margin: "0px"}}>Availability: { parseInt(availability) === 0 ? "full" : availability}</p>
                    <div className="bottom-buttons">
                            {
                                this.userExist ?
                                    <Button className="float-left" variant="danger" onClick={() => {
                                        this.props.leaveEvent(this.props.event.id)
                                    }}>Leave</Button>
                                    :
                                    [
                                        parseInt(availability) !== 0 ?
                                        <Button key='0' className="float-left" variant="success" onClick={() => {
                                            this.props.joinEvent(this.props.event.id)
                                        }}>Join</Button> : null
                                    ]
                            }

                        <Button className="float-right" variant="secondary" onClick={ this.props.closeCard }>Close</Button>
                    </div>
                </div>
            </div>
        </div>
        );
    };
}