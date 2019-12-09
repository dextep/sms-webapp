import React, {Component} from 'react';
import './styles.css'
import { format } from 'date-fns'
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import { history} from "../../helpers/history";

export default class MapSidebar extends Component {
    render() {
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth();
        let day = d.getDate();
        let minY = new Date(year, month, day)
        let maxY = new Date(year + 1, month, day)
        return (
            <div id="sidebar">
                <div className="container">
                    <br/>
                    <h5>Adding Event</h5>
                    <Formik
                        initialValues={{
                            expTime: format(d.setMinutes( d.getMinutes() + 2 ), "HH:mm"),
                            expDate: format(new Date(), "yyyy-MM-dd"),
                            type: 'Walking 🚶🏻‍♀️',
                            description: '',
                        }}
                        validationSchema={Yup.object().shape({
                            expDate: Yup
                                .date()
                                .max(maxY)
                                .min(minY)
                                .required('expDate is required'),
                        })}
                        onSubmit={({expDate, expTime, type, description, seatsNumber}, {setStatus, setSubmitting}) => {
                            setStatus();
                            const data = JSON.stringify({
                                experience: new Date(expDate+' '+expTime),
                                type: type,
                                description: description,
                                seatsNumber: seatsNumber,
                                latitude: this.props.location.lat,
                                longitude: this.props.location.lng
                            });
                            axios.post('http://localhost:8080/api/v1/event', data)
                                .then( response => {
                                    this.props.disablePin();
                                    console.log("response")
                                    console.log(response)
                                    history.push( "/");
                                })
                                .catch( error => {
                                    setSubmitting(false);
                                    setStatus(error.toString())
                                });
                        }}
                        render={({errors, status, touched, isSubmitting}) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="expDate">When:</label>
                                    <Field name="expTime" type="time" style={{width: "40%",display: "inline-block", margin: "0"}} className={'form-control' + (errors.expTime && touched.expTime ? ' is-invalid' : '')} />
                                    <Field name="expDate" type="date" style={{width: "60%",display: "inline-block", margin: "0"}} className={'form-control' + (errors.expDate && touched.expDate ? ' is-invalid' : '')} />
                                    <ErrorMessage name="expDate" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="type">Type:</label>
                                    <Field name="type" as="select"
                                           className={'form-control' + (errors.type && touched.type ? ' is-invalid' : '')}>
                                        <option value="Walking 🚶🏻‍♀️">Walking</option>
                                        <option value="Running 🏃🏼‍♂️">Running</option>
                                        <option value="Cycling 🚴🏻‍♀️">Cycling</option>
                                        <option value="Swimming 🏊🏼‍♂️">Swimming</option>
                                    </Field>
                                    <ErrorMessage name="type" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="type">Number of seats:</label>
                                    <Field name="seatsNumber" as="select"
                                           className={'form-control' + (errors.seatsNumber && touched.seatsNumber ? ' is-invalid' : '')}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </Field>
                                    <ErrorMessage name="seatsNumber" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description:</label>
                                    <Field name="description" component="textarea" rows="3"
                                           className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="description" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success" disabled={isSubmitting}>Add
                                    </button>
                                    <button className="btn btn-danger float-right" >Close
                                    </button>
                                </div>
                                {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                                }
                            </Form>
                        )}
                    />
                </div>
            </div>
        );
    };
}