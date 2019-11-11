import axios from "axios";
import * as routes from "../helpers/routes";

export const signUp = (firstName,
                       lastName,
                       email,
                       password,
                       birthday,
                       mobileNr) => {
    const data = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        birthday: birthday,
        mobileNumber: mobileNr
    });
    return axios.post(routes.signUp, data)
}

export function getLocation() {
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        }, () => {
            resolve(fetch('https://ipapi.co/json')
                .then(res => res.json())
                .then(location => {
                    return {
                        lat: location.latitude,
                        lng: location.longitude
                    };
                }));
        });
    });
}

export function andEvent(data) {
    return axios.post(routes.event, JSON.stringify(data))
}

export function getEvents () {
    return fetch(`${routes.event}`)
        .then(res => res.json())
        .then(events => {
            const eventSameLocation = {};
            return events.reduce((all, event) => {
                const key = `${event.latitude.toFixed(3)}${event.longitude.toFixed(3)}`;
                if (eventSameLocation[key]) {
                    eventSameLocation[key].otherEvents = eventSameLocation[key].otherEvents || [];
                    eventSameLocation[key].otherEvents.push(event);
                } else {
                    eventSameLocation[key] = event;
                    all.push(event);
                }
                return all;
            }, []);
        });
};

export function getEvent (id) {
    return axios.get(`${routes.event}/${id}`)
        .then(response => {
            return {
                type: response.data.type,
                description: response.data.description,
                experience: response.data.experience
            }
        })
};