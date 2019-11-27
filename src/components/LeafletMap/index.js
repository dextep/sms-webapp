import React, {Component, createRef} from 'react';
import './styles.css'
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer, Tooltip, ZoomControl, AttributionControl } from 'react-leaflet'
import {getLocation, getEvents, getEvent} from '../../services/api'
import * as routes from "../../helpers/routes";
import userLocation from "../../noun_Location_1044413.svg";
import eventLocation from "../../event_location.svg";
import EventCard from "../EventCard/index";
import Control from 'react-leaflet-control';
import AddEventCard from '../addEventCard'
import {Button, ButtonGroup, Image} from 'react-bootstrap'
import {Card} from "react-bootstrap";
import MapSidebar from "../MapSidebar";
import Sidebar from "react-sidebar";
import { MdMyLocation } from 'react-icons/md';

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
            haveUsersLocation: false,
            showEvent: false,
            zoom: 3,
            events: [],
            userEvents: [],
            event: {
                type: "",
                description: "",
                experience: "",
            },
            addEvent: false,
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
        this.setState({
            user: JSON.parse(localStorage.getItem("UserData"))
        })
        this.loadEventPins();
    }

    loadEventPins = () => {
        const userEvents = [];
        const anotherEvents = [];
        getEvents()
            .then( events => {
                events.map(event => {
                    console.log("longitude: "+event.latitude)
                    console.log("longitude: "+event.longitude)
                    console.log("user id: "+event.user.id)
                    console.log(this.state.user)

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


    findPin = () => {
        const marker = this.myMapRef.current
        marker.leafletElement.flyTo(this.state.location, 18)
    }

    resetPin = () => {
        getLocation()
            .then(location => {
                this.myMapRef.current.leafletElement.flyTo(location, 18)
                this.setState({
                    location
                });
            });
    }
    resetLocation = () => {
        const marker = this.myMapRef.current
        getLocation()
            .then(location => {
                marker.leafletElement.flyTo(location, 18)
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
            })
    }

    updatePosition = () => {
        console.log(this.myPinRef.current.leafletElement.getLatLng())
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
        if(!this.state.addEvent){
            this.setState({
                addEvent: true
            })
        }else{
            alert("You are already adding an event.")
        }
    }

    closeAddEventCard = () => {
        // this.state.marker.remove()
        this.setState({
            addEvent: false
        });
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
                {
                    this.state.showEvent ?
                        <EventCard
                            closeCard={this.closeCard}
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
                        <MapSidebar location={this.state.location} disablePin={this.disablePin}/>
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
                                    <span>{event.type}</span>
                                </Tooltip>
                            </Marker>
                        ))
                    }
                    {
                        this.state.userEvents.map(event => (
                            <Marker
                                onClick={() => this.openCard(event.id)}
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
                                <Tooltip direction='right' offset={[-10, 0]} opacity={1} permanent>
                                    <span>{event.type}</span>
                                </Tooltip>
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
                            <Button xs={6} md={4}><MdMyLocation onClick={ () => this.resetLocation()}/></Button>
                            {/*<Button onClick={ () => this.resetLocation()}><h3><FaLocationArrow/></h3>Reset View</Button>*/}
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
