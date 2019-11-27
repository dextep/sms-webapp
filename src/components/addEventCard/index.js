import React from 'react';
import './styles.css'
import { format } from 'date-fns'
import {
    Card,
    Button,
    CardTitle,
    CardText,
    Form,
    FormGroup,
    Label,
    Input,
    FormLabel,
    ButtonGroup,
    ButtonToolbar
} from 'react-bootstrap';
import {ErrorMessage, Field, Formik} from "formik";
import * as Yup from "yup";
import {getLocation, getEvents, addEvent} from '../../services/api'
const AddEventCard = (props) => {


    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let minY = new Date(year, month, day)
    let maxY = new Date(year+1, month, day)
    return (
        <Card className="eventFormInfo">
            <Card.Body >
                <Card.Title>Add Event</Card.Title>
                <Formik
                    initialValues={{
                        expDate: `${format(new Date(), "yyyy-MM-dd'T'HH:mm")}`,
                        type: '',
                        description: '',
                    }}
                    validationSchema={Yup.object().shape({
                        expDate: Yup
                            .date()
                            .max(maxY)
                            .min(minY)
                            .required('expDate is required'),
                    })}
                    onSubmit={ ({expDate, type, description}, { setStatus ,setSubmitting }) => {
                        setStatus();
                        // console.log(JSON.stringify({
                        //     experience: expDate,
                        //     type: type,
                        //     description: description,
                        //     latitude: props.location.lat,
                        //     longitude: props.location.lng
                        // }))
                        // addEvent(JSON.stringify({
                        //     experience: expDate,
                        //     type: type,
                        //     description: description,
                        //     latitude: props.location.lat,
                        //     longitude: props.location.lng
                        //     }))
                        // .then( response => {
                        //     console.log(response.data)
                        //     // this.props.history.push( "/signIn");
                        // })
                        // .catch( error => {
                        //     setSubmitting(false);
                        //     setStatus(error.toString())
                        // });
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="expDate">When:</label>
                                <Field name="expDate"  type="datetime-local" className={'form-control' + (errors.expDate && touched.expDate ? ' is-invalid' : '')} />
                                <ErrorMessage name="expDate" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="type">Type:</label>
                                <Field name="type" as="select" name="color" className={'form-control' + (errors.type && touched.type ? ' is-invalid' : '')}>
                                    <option>Walking</option>
                                    <option>Running</option>
                                    <option>Cycling</option>
                                    <option>Swimming</option>
                                </Field>
                                <ErrorMessage name="type" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <Field name="description" component="textarea" rows="3" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                <ErrorMessage name="description" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success" disabled={isSubmitting}>Add</button>
                                <button className="btn btn-danger float-right" onClick={props.closeCard}>Close</button>
                            </div>
                            {status &&
                            <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}

                />
                {/*<Button className="float-left " variant="success" onClick={props.closeCard}>Add</Button>*/}
                {/*<Button className="float-right" variant="danger" onClick={props.closeCard}>Close</Button>*/}
            </Card.Body>
        </Card>
    );
};

export default AddEventCard;