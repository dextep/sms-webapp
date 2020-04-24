import React, { Component } from 'react'
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {login} from "../../services/authenticationServices";
import Dashboard from "../Dashboard";
import { signUp } from "../../services/api"
class SignUp extends Component {

    render() {
        const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth();
        let day = d.getDate();
        let minY = new Date(year - 100, month, day)
        let maxY = new Date(year - 10, month, day)
        return (
            <div>
                <h2>SignUp</h2>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        confirmEmail: '',
                        password: '',
                        confirmPassword: '',
                        birthday: '',
                        mobileNr: ''
                    }}
                    validationSchema={Yup.object().shape({
                        firstName: Yup
                            .string()
                            .required('First Name is required'),
                        lastName: Yup
                            .string()
                            .required('Nast Name is required'),
                        email: Yup
                            .string()
                            .email()
                            .required('Email is required'),
                        confirmEmail: Yup
                            .string()
                            .email()
                            .oneOf([Yup.ref('email')], 'Email are not the same!')
                            .required('Email confirm is required'),
                        birthday: Yup
                            .date()
                            .max(maxY)
                            .min(minY)
                            .required('Birthday is required'),
                        mobileNr: Yup
                            .string()
                            .matches(phoneRegExp, 'Phone number is not valid'),
                        password: Yup.string()
                            .required('Password is required!'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password')], 'Passwords are not the same!')
                            .required('Password confirmation is required!')

                    })}
                    onSubmit={ ({firstName,
                                    lastName,
                                    email,
                                    password,
                                    birthday,
                                    mobileNr }, { setStatus ,setSubmitting }) => {
                        setStatus();
                        signUp(firstName,
                            lastName,
                            email,
                            password,
                            birthday,
                            mobileNr)
                            .then( response => {
                                window.location.reload();
                            })
                            .catch( error => {
                                setSubmitting(false);
                                setStatus(error.toString())
                            });
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name:</label>
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name:</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthday">Birthday Date:</label>
                                <Field name="birthday" type="date" className={'form-control' + (errors.birthday && touched.birthday ? ' is-invalid' : '')} />
                                <ErrorMessage name="birthday" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmEmail">Confirm Email:</label>
                                <Field name="confirmEmail" type="text" className={'form-control' + (errors.confirmEmail && touched.confirmEmail ? ' is-invalid' : '')} />
                                <ErrorMessage name="confirmEmail" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobileNr">Phone number:</label>
                                <Field name="mobileNr" type="text" className={'form-control' + (errors.mobileNr && touched.mobileNr ? ' is-invalid' : '')} />
                                <ErrorMessage name="mobileNr" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Sign Up</button>
                            </div>
                            {status &&
                            <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}
                />
            </div>
        )
    }
}
export default SignUp;
