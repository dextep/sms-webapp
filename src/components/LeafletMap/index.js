import React, {Component} from 'react';
import './styles.css'
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import {getLocation, getEvents, getEvent} from '../../services/api'
import * as routes from "../../helpers/routes";
import userLocation from "../../noun_Location_1044413.svg";
import eventLocation from "../../event_location.svg";
import EventCard from "../EventCard/index";

import {Card} from "react-bootstrap";
import MapSidebar from "../MapSidebar";

const userLocationIcon = L.icon({
    iconUrl: userLocation,
    iconSize: [40, 82]
});
const eventLocationIcon = L.icon({
    iconUrl: eventLocation,
    iconSize: [40, 52]
});

export class LeafletMap extends Component {
    // constructor () {
    //     super()
        state = {
            location: {
                lat: 50.505,
                lng: 10.09,
            },
            haveUsersLocation: false,
            showEvent: false,
            zoom: 14,
            events: [],
            event: {
                type: "",
                description: "",
                experience: "",
            }
        };
    // }

    componentDidMount() {

        getEvents()
            .then( events => {
                this.setState({
                    events
                });
            });


        getLocation()
            .then(location => {
                this.setState({
                    location,
                    haveUsersLocation: true,
                    zoom: 17
                });
            });

    }

    openCard = (id) => {
        this.setState({
            showEvent: true
        });
        getEvent(id)
            .then(event => {
                this.setState({
                    event,
                });

                console.log(this.state.event)
            })

    }

    closeCard = () => {
        this.setState({
            showEvent: false
        });
    }

    render () {
        const position = [this.state.location.lat, this.state.location.lng];
        return (
            <div id="wrapper">
                {/*{*/}
                {/*    this.state.showEvent ?*/}
                {/*        <EventCard*/}
                {/*            closeCard={this.closeCard}*/}
                {/*            event={this.state.event}*/}
                {/*        /> : ""*/}
                {/*}*/}
                <MapSidebar/>
                <Map
                    center={position}
                    zoom={this.state.zoom}>
                    <TileLayer
                        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors and Chat location by Iconika from the Noun Project"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/*{*/}
                    {/*    this.state.haveUsersLocation ?*/}
                    {/*        <Marker*/}
                    {/*            icon={userLocationIcon}*/}
                    {/*            position={position}>*/}
                    {/*            <Popup>*/}
                    {/*                Me*/}
                    {/*            </Popup>*/}
                    {/*        </Marker> : ''*/}
                    {/*}*/}
                    {
                        this.state.events.map(event => (
                            <Marker
                                onClick={() => this.openCard(event.id)}
                                key={event.id}
                                position={[event.latitude, event.longitude]}>
                                <Popup>
                                    <p><em>{event.type}:</em> {event.description}</p>
                                    { event.otherEvents ? event.otherEvents.map(event =>
                                        <p key={event.id}>

                                            <em>{event.type}:</em> {event.description}
                                        </p>) : ''
                                    }
                                </Popup>
                                <Tooltip direction='right' offset={[-10, 0]} opacity={1} permanent>
                                    <span>{event.type}🏃🏼‍♂️ </span>
                                </Tooltip>
                            </Marker>
                        ))
                    }
                </Map>
            </div>
        )
    }
}

export default LeafletMap;
