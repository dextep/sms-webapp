import React, {Component, createRef} from 'react';
import './styles.css'
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer, Tooltip, ZoomControl, AttributionControl } from 'react-leaflet'
import {getLocation, getEvents, getEvent, setUserData} from '../../services/api'
import * as routes from "../../helpers/routes";
import userLocation from "../../noun_Location_1044413.svg";
import eventLocation from "../../event_location.svg";
import EventCard from "../EventCard/index";
import EventEditCard from "../EventEditCard/index";
import Control from 'react-leaflet-control';
import AddEventCard from '../addEventCard'
import {Button, ButtonGroup, Image} from 'react-bootstrap'
import {Card} from "react-bootstrap";
import MapSidebar from "../MapSidebar";
import Sidebar from "react-sidebar";
import { MdMyLocation } from 'react-icons/md';
import { css } from '@emotion/core';
// First way to import
import { BeatLoader } from 'react-spinners';
import axios from "axios";
import {history} from "../../helpers/history";
import {format} from "date-fns";
// Another way to import. This is recommended to reduce bundle size
const userLocationIcon = L.icon({
    iconUrl: userLocation,
    iconSize: [40, 82]
});
const eventLocationIcon = L.icon({
    iconUrl: eventLocation,
    iconSize: [40, 52]
});

export class LeafletMap extends Component {
    constructor () {
        super();
        this.state = {
            location: {
                lat: 50.505,
                lng: 10.09,
            },
            loading: false,
            haveUsersLocation: false,
            showEvent: false,
            showEventEditCard: false,
            addEvent: false,
            zoom: 3,
            events: [],
            userEvents: [],
            event: {},
            marker: null,
            user: {}
        };
        this.myMapRef = React.createRef();
        this.myPinRef = React.createRef();
    }

    componentDidMount() {
        getLocation()
            .then(location => {
                this.setState({
                    location,
                    haveUsersLocation: true,
                    zoom: 17
                });
            });

        if(localStorage.getItem("UserData") == null) {
            setUserData().then( () => {
                this.setState({
                    user: JSON.parse(localStorage.getItem("UserData"))
                }, () => {
                    this.loadEventPins();
                })
            })
        }else{
            this.setState({
                user: JSON.parse(localStorage.getItem("UserData"))
            }, () => {
                this.loadEventPins();
            })
        }

    }

    loadEventPins = () => {
        const userEvents = [];
        const anotherEvents = [];
        getEvents()
            .then( events => {
                events.map(event => {
                    console.log(event)
                    if(event.user.id === this.state.user.id){
                        userEvents.push(event)
                    }else{
                        anotherEvents.push(event)
                    }
                })
                this.setState({
                    userEvents: userEvents,
                    events: anotherEvents
                });
            });
    }


    closeCards = () => {
        this.setState({
            event: {},
            addEvent: false,
            haveUsersLocation: false,
            showEvent: false,
            showEventEditCard: false,
        })
    }

    findPin = () => {
        this.myMapRef.current.leafletElement.flyTo(this.state.location, 16)
    }

    resetPin = () => {
        getLocation()
            .then(location => {
                this.myMapRef.current.leafletElement.flyTo(location, 16)
                this.setState({
                    location
                });
            });
    }

    resetLocation = () => {
        getLocation()
            .then(location => {
                this.myMapRef.current.leafletElement.flyTo(location, 17)
            });
    }

    openCard = (id) => {
        if (this.state.event.id !== id) {
            this.closeCards();
            getEvent(id)
                .then(event => {
                    this.setState({
                        event,
                        showEvent: true
                    });
                })
        }
    }

    openEventEditCard = (id) => {
        if (this.state.event.id !== id) {
            this.closeCards();
            getEvent(id)
                .then(event => {
                    this.setState({
                        event,
                        showEventEditCard: true
                    });
                })
        }
    }

    updatePosition = () => {
        this.setState({
            location: this.myPinRef.current.leafletElement.getLatLng(),
        })
    }

    disablePin = () => {
        // if (this.state.addEvent) {
            this.setState({
                addEvent: false
            })
        this.loadEventPins();
    }

    addEvent = () => {
        this.closeCards();
        if(!this.state.addEvent){
            this.setState({
                addEvent: true
            })
        }
    }

    closeAddEventCard = () => {
        // this.state.marker.remove()
        this.setState({
            addEvent: false
        });
    }

    joinEvent = (id) => {
        axios.post(`http://localhost:8080/api/v1/event/join/${id}`)
            .then( response => {
                console.log(response)
            })
            .catch( error => {
                console.log(error)
            });
    }

    leaveEvent = (id) => {
        axios.post(`http://localhost:8080/api/v1/event/leave/${id}`)
            .then( response => {
                console.log(response)
            })
            .catch( error => {
                console.log(error)
            });
    }

    deleteEvent = (id) => {
        axios.delete(`http://localhost:8080/api/v1/event/${id}`)
            .then( response => {
                console.log(response)
                this.closeCards();
                this.loadEventPins();
            })
            .catch( error => {
                console.log(error)
            });
    }

    render () {
        const override = css`
            z-index: 999;
            position: absolute;
            top: 50%;
            right: 50%;
        `;
        const position = [this.state.location.lat, this.state.location.lng];
        return (
            <div id="wrapper">
                <BeatLoader
                    css={override}
                    sizeUnit={"px"}
                    size={15}
                    loading={this.state.loading}
                />
                {
                    this.state.showEvent ?
                        <EventCard
                            closeCard={this.closeCards}
                            reloadPins={this.loadEventPins}
                            joinEvent={this.joinEvent}
                            leaveEvent={this.leaveEvent}
                            event={this.state.event}
                        /> : ""
                }
                {
                    this.state.showEventEditCard ?
                        <EventEditCard
                            closeCard={this.closeCards}
                            deleteEvent={this.deleteEvent}
                            reloadPins={this.loadEventPins}
                            event={this.state.event}
                        /> : ""
                }
                {/*{*/}
                {/*    this.state.addEvent ?*/}
                {/*        <AddEventCard*/}
                {/*            closeCard={this.closeAddEventCard}*/}
                {/*            location={this.state.location}*/}
                {/*        /> : ""*/}
                {/*}*/}
                {
                    this.state.addEvent ?
                        <MapSidebar location={this.state.location} disablePin={this.disablePin} closeCard={this.closeCards}/>
                        : ""
                }
                {/*{*/}
                {/*    this.state.showEvent ?*/}
                {/*        <MapSidebar/>*/}
                {/*        : ""*/}
                {/*}*/}
                <Map
                    attributionControl={false}
                    zoomControl={false}
                    center={position}
                    zoom={this.state.zoom}
                    ref={this.myMapRef}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
                        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />

                    {
                        this.state.events.map(event => (
                            <Marker
                                onClick={() => this.openCard(event.id)}
                                key={event.id}
                                position={[event.latitude, event.longitude]}
                                >
                                {/*<Popup>*/}
                                {/*    <p><em>{event.type}:</em> {event.description}</p>*/}
                                {/*    { event.otherEvents ? event.otherEvents.map(event =>*/}
                                {/*        <p key={event.id}>*/}

                                {/*            <em>{event.type}:</em> {event.description}*/}
                                {/*        </p>) : ''*/}
                                {/*    }*/}
                                {/*</Popup>*/}
                                <Tooltip direction='right' offset={[-10, 0]} opacity={1} permanent>
                                    <span>
                                        {format(new Date(`${event.experience}`),"HH:mm dd.MM.yyyy")}<br/>
                                        {event.type}
                                    </span>
                                </Tooltip>
                            </Marker>
                        ))
                    }
                    {
                        this.state.userEvents.map(event => (
                            <Marker
                                onClick={() => this.openEventEditCard(event.id)}
                                icon={userLocationIcon}
                                key={event.id}
                                position={[event.latitude, event.longitude]}
                                >
                                {/*<Popup>*/}
                                {/*    <p><em>{event.type}:</em> {event.description}</p>*/}
                                {/*    { event.otherEvents ? event.otherEvents.map(event =>*/}
                                {/*        <p key={event.id}>*/}

                                {/*            <em>{event.type}:</em> {event.description}*/}
                                {/*        </p>) : ''*/}
                                {/*    }*/}
                                {/*</Popup>*/}
                            </Marker>
                        ))
                    }

                    {
                        this.state.addEvent ?
                            <Marker
                                zIndexOffset={1000}
                                draggable={true}
                                onDragend={this.updatePosition}
                                icon={userLocationIcon}
                                ref={this.myPinRef}
                                keepInView={true}
                                position={position}>
                                <Popup
                                    autoPan={true}>
                                    <p>You</p>
                                </Popup>
                            </Marker> : ''
                    }

                    <AttributionControl position="bottomleft"/>
                    <Control position="topleft" >
                        <ButtonGroup vertical size={'sm'}>
                            <Button onClick={ () => this.resetLocation()} xs={6} md={4}><MdMyLocation/></Button>
                            <Button onClick={ () => this.findPin()}>Find Pin</Button>
                            <Button onClick={ () => this.resetPin()}>Reset Pin</Button>
                            <Button onClick={ () => this.addEvent()}>Add Event</Button>
                        </ButtonGroup>
                    </Control>

                </Map>

            </div>
        )
    }
}

export default LeafletMap;
