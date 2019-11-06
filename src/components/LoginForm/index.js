import React from 'react';
import './styles.css';
import { Formik } from "formik";
import { login } from '../../services/authenticationServices'
import * as Yup from "yup"
import {setAuthToken} from "../../helpers/setAuthToken";


const ValidatedLoginForm = () => (

    <Formik
        initialValues={{
            email: "",
            password: ""
        }}
        onSubmit={ ({email, password }, { setStatus ,setSubmitting }) => {
            setStatus();
            login(email, password)
                .then( response => {
                    const token = response.data.JwtToken
                    localStorage.setItem('JwtToken', token );
                    setAuthToken(token); // Adding Token to request header
                })
                .catch( error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                    setSubmitting(false);
                    setStatus(error.toString())
                });


                // .then(
                // token => {
                //     console.log(token)
                // },
                // error => {
                //     setSubmitting(false);
                //     setStatus(error.toString());
                // })
        }}
        validationSchema={ Yup.object().shape({
            email: Yup.string()
                .email()
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .min(2, "Password is too short")
                // .matches(/(?=.*[0-9])/, "Password must contain a number.")
        })}
    >
        {
            props => {
                const {status, values, touched, errors, isSubmitting, handleChange, handleBluer, handleSubmit} = props;
                return (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="text"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBluer}
                            className={errors.email && touched.email && "error"}
                        />
                        {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                        )}
                        <label htmlFor="email">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBluer}
                            className={errors.password && touched.password && "error"}
                        />
                        {errors.password && touched.password && (
                            <div className="input-feedback">{errors.password}</div>
                        )}
                        {status &&
                            <div className="input-feedback">{status}</div>
                        }
                        <button type="submit" disabled={isSubmitting}>Login</button>
                    </form>
                )
            }
        }
    </Formik>
)

export default ValidatedLoginForm;
