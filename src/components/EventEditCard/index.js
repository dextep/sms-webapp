import React from 'react';
import './styles.css'
import { Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input } from 'react-bootstrap';
import Timer from "react-compound-timer";
import {differenceInMilliseconds, format} from "date-fns";

const EventEditCard = (props) => {
    let initTime = 0;
    const dif = differenceInMilliseconds(new Date(`${props.event.experience}`), new Date());
    if( dif > 0 )
        initTime = dif;

    console.log("props.event")
    console.log(props.event)
    return (
        <Card className="eventFormInfo">
            <Card.Body>
                <Card.Title>You'r event.</Card.Title>
                <Card.Title>{props.event.type}</Card.Title><br/>
                <Card.Text>
                    <Timer
                        initialTime={ initTime }
                        direction="backward"
                    >
                        {() => (
                            <React.Fragment>
                                End in: <Timer.Days /> days <Timer.Hours /> hours <Timer.Minutes /> minutes <Timer.Seconds /> sec<br/>
                            </React.Fragment>
                        )}
                    </Timer><br/>
                    {props.event.id}<br/>
                    {format(new Date(`${props.event.creationDate}`), "yyyy-MM-dd HH:mm")}<br/>
                    {format(new Date(`${props.event.experience}`), "yyyy-MM-dd HH:mm")}<br/>
                    {props.event.creationDate}<br/>
                    {props.event.partner}<br/>
                    {props.event.seatsNumber}<br/>
                    {props.event.type}<br/>
                </Card.Text>
                <Button className="float-left" variant="success" onClick={props.closeCard}>Save</Button>
                <Button variant="danger" onClick={ () => { props.deleteEvent(props.event.id ) } }>Delete</Button>
                <Button className="float-right" variant="secondary" onClick={props.closeCard}>Close</Button>
            </Card.Body>
        </Card>
    );
};

export default EventEditCard;