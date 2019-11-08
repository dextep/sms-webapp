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