import React, {Component} from 'react';
import './styles.css'
import { Card, Button, ToastHeader, ButtonToolbar, InputGroup, ButtonGroup, FormControl, CardTitle, CardText, Form, FormGroup, Label, Input } from 'react-bootstrap';
import Timer from "react-compound-timer";
import {differenceInMilliseconds, format} from "date-fns";
import {Marker, Tooltip} from "react-leaflet";
import index from "../Navbar";

export default class EventEditCard extends Component {
    createTable = () => {
        let availability = []
        for (let i = 1; i <= this.props.event.availability; i++) {
            if (this.props.event.partner[i-1]){
                availability.push({no: i, user: this.props.event.partner[i-1].fullName});
            }else{
                availability.push({no: i, user: 'empty'});
            }
        }
        return availability
    }

    render() {

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
        return (
            <div>
                <div id="sidebar">
                    <div className="container">
                        <p className="float-right" style={{padding: "0px",fontSize: "14px",lineHeight: "14px",margin: "3px 0 0 0",textAlign: "right"}}>
                            {expDate}<br/>
                            {expTime}
                        </p>
                        <h5 style={{fontSize: "19px", margin: "30px 0px 0px 0px" }}>{this.props.event.type}</h5>
                        <p style={{fontSize: "15px", margin: "10px 0px 0px 0px" }}>You'r event is comming soon:</p>
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
                            <p style={{fontSize: "15px", margin: "0px"}}>Description: {this.props.event.descriptiona === "" ? this.props.event.descriptiona : "none"}</p>
                            <p style={{fontSize: "15px", margin: "0px"}}>Participants:</p>
                            <ul style={{fontSize: "15px", padding: "0px", listStyleType: "none"}}>
                                {this.createTable().map( (partner, index) =>
                                    <li key={index}>
                                        <label>{partner.no}: {partner.user}</label>
                                        {/*<button type="button" onClick={() => handleClick(item.id)}>*/}
                                        {/*    Remove*/}
                                        {/*</button>*/}
                                    </li>
                                )}
                            </ul>
                            <div className="bottom-buttons">
                                {/*<Button className="float-left" variant="success" onClick={props.closeCard}>Save</Button>*/}
                                <Button variant="danger" onClick={() => {this.props.deleteEvent(this.props.event.id)}}>Delete</Button>
                                <Button className="float-right" variant="secondary" onClick={ this.props.closeCard}>Close</Button>
                            </div>
                    </div>
                </div>
            </div>
        );
    };
}


{/*<Card className="eventFormInfo">*/}
{/*    <Card.Body>*/}
{/*        <Card.Title>You'r event.</Card.Title>*/}
{/*        <Card.Text style={{margin: "0px"}}>*/}
{/*            <Timer*/}
{/*                initialTime={initTime}*/}
{/*                direction="backward"*/}
{/*                checkpoints={*/}
{/*                    [{*/}
{/*                        time: 0,*/}
{/*                        callback: () => {*/}
{/*                            this.props.closeCard();*/}
{/*                            this.props.reloadPins();*/}
{/*                        },*/}
{/*                    }]}*/}

{/*            >*/}
{/*                {() => (*/}
{/*                    <React.Fragment>*/}
{/*                        <b><Timer.Days /></b>days <b><Timer.Hours /></b>hours <b><Timer.Minutes /></b>minutes <b><Timer.Seconds /></b>sec*/}
{/*                    </React.Fragment>*/}
{/*                )}*/}
{/*            </Timer><br/>*/}
{/*            Type: {this.props.event.type}<br/>*/}
{/*            /!*{format(new Date(`${props.event.experience}`), "yyyy-MM-dd HH:mm")}<br/>*!/*/}
{/*            Availability:*/}


{/*        </Card.Text>*/}
{/*        <ul>*/}
{/*            {this.createTable().map( (partner, index) =>*/}

{/*                <li key={index}>*/}
{/*                    <label>{partner.no} : {partner.user}</label>*/}
{/*                    /!*<button type="button" onClick={() => handleClick(item.id)}>*!/*/}
{/*                    /!*    Remove*!/*/}
{/*                    /!*</button>*!/*/}
{/*                </li>*/}
{/*            )}*/}
{/*        </ul>*/}
{/*        /!*<Button className="float-left" variant="success" onClick={props.closeCard}>Save</Button>*!/*/}
{/*        <Button variant="danger" onClick={() => {*/}
{/*            this.props.deleteEvent(this.props.event.id)*/}
{/*        }}>Delete</Button>*/}
{/*        <Button className="float-right" variant="secondary" onClick={ this.props.closeCard}>Close</Button>*/}
{/*    </Card.Body>*/}
{/*</Card>*/}

// export default EventEditCard;