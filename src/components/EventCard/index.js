import React from 'react';
import './style.css'
import { Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input } from 'react-bootstrap';

const EventCard = (props) => {
    return (
        <Card className="eventFormInfo">
            <Card.Body>
                <Card.Title>{props.event.type}</Card.Title>
                <Card.Subtitle>{props.event.experience}</Card.Subtitle>
                <Card.Text>{props.event.description}</Card.Text>
                <Button className="float-right" variant="danger" clasonClick={props.closeCard}>Close</Button>
            </Card.Body>
        </Card>
    );
};

export default EventCard;