import React, {Component} from 'react';
import './styles.css'
import { format, isAfter, parse } from 'date-fns'
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import { history} from "../../helpers/history";
import {Button} from "react-bootstrap";
import {getEventTypes} from '../../services/api'
import * as routes from "../../helpers/routes";
import {serverUrl} from "../../helpers/routes";


export default class MapSidebar extends Component {
    constructor() {
        super();
        this.state = {
            options: ""
        };
    };

    componentDidMount() {
        this.renderOptions();
    }

    renderOptions = async() => {
        try {
            let res = await axios.get(`${routes.event}/types`);
            let data = res.data;
            // this will re render the view with new data
            this.setState({
                options: data.map((type, i) => (
                    <option key={i} value={type.type}>{type.type}</option>
                ))
            });
        } catch (err) {
            console.log(err);
        }
    }

    createOptionList = () => {
        let option = []
        getEventTypes().then( eventTypes =>
            eventTypes.map( (eventType,index) => {
                option.push(<option key={index} value={eventType.id}>{eventType.type}</option>)
            })
        )
        return option
    }

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
                            type: 'Walk',
                            description: '',
                            availability: 1
                        }}
                        validationSchema={Yup.object().shape({
                            expDate: Yup
                                .date()
                                .max(maxY, 'Event date should be earlier.')
                                .min(minY, 'Event date should be later.')
                                .required('Event date is required.'),
                            expTime: Yup
                                .string()
                                .required("Event time is required.")
                                // .test("is-greater", "Event time should be later.", function(value) {
                                //     return isAfter(parse(value, "HH:mm", new Date()), parse(format(new Date(), "HH:mm"),"HH:mm", new Date()));
                                // })
                        })}
                        onSubmit={({expDate, expTime, type, description, availability}, {setStatus, setSubmitting}) => {
                            setStatus();
                            console.log(availability)
                            const data = JSON.stringify({
                                experience: new Date(expDate+' '+expTime),
                                type: type,
                                description: description,
                                availability: availability,
                                latitude: this.props.location.lat,
                                longitude: this.props.location.lng
                            });
                            axios.post(`${serverUrl}/api/v1/event`, data)
                                .then( response => {
                                    this.props.disablePin();
                                    history.push( "/");
                                })
                                .catch( error => {
                                    setSubmitting(false);
                                    setStatus(error.toString())
                                });
                        }}
                        render={({errors, status, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="expDate">When:</label>
                                    <Field name="expTime" type="time" style={{width: "98px",display: "inline-block", margin: "0"}} className={'form-control' + (errors.expTime && touched.expTime ? ' is-invalid' : '')} />
                                    <Field name="expDate" type="date" style={{width: "156px",display: "inline-block", margin: "0"}} className={'form-control' + (errors.expDate && touched.expDate ? ' is-invalid' : '')} />
                                    <ErrorMessage name="expDate" component="div" className="invalid-feedback"/>
                                    <ErrorMessage name="expTime" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="type">Type:</label>
                                    <Field name="type" as="select" className={'form-control' + (errors.type && touched.type ? ' is-invalid' : '')}>
                                        {
                                            this.state.options
                                        }
                                    </Field>
                                    <ErrorMessage name="type" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="type">Number of seats:</label>
                                    <Field name="availability" as="select"
                                           className={'form-control' + (errors.availability && touched.availability ? ' is-invalid' : '')}>
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
                                    <ErrorMessage name="availability" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description:</label>
                                    <Field name="description" component="textarea" rows="3"
                                           className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')}/>
                                    <ErrorMessage name="description" component="div" className="invalid-feedback"/>
                                </div>
                                <div className="bottom-buttons">
                                    <Button className="float-left" variant="success" type="submit" >Add</Button>
                                    <Button className="float-right" variant="secondary" onClick={this.props.closeCard} >Close</Button>
                                </div>
                                {status && <div className={'alert alert-danger'}>{status}</div>
                                }
                            </Form>
                        )}
                    />
                </div>
            </div>
        );
    };
}