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

export function getEvents () {
    return axios.get(`${routes.event}`)
        .then(res => res.data)
        .then(events => {
            return events;
        });
};

export function getEventTypes () {
    return axios.get(`${routes.event}/types`)
        .then(eventTypes => {
            return eventTypes;
        });
};

export function setUserData() {
    return axios.get(`${routes.profile}`)
        .then(response => {
            localStorage.setItem('UserData', JSON.stringify(response.data));
        })
        .catch(error => {
            console.log(error)
            return error;
        })
}

export function getEvent (id) {
    return axios.get(`${routes.event}/${id}`)
        .then(response => {
            return response.data;
        })
};