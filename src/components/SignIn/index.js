import React, { Component } from 'react';
import './styles.css';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { login } from '../../services/authenticationServices'
import * as Yup from "yup"

class SignIn extends Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (localStorage.getItem("JwtToken"))
        {
            this.props.history.push( "/");
        }
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().required('Email is required'),
                        password: Yup.string().required('Password is required')
                    })}
                    onSubmit={ ({email, password }, { setStatus ,setSubmitting }) => {
                        setStatus();
                        login(email, password)
                            .then( response => {
                                const token = response.data.JwtToken;
                                localStorage.setItem('JwtToken', token );
                                this.props.history.push( "/");
                            })
                            .catch( error => {
                                setSubmitting(false);
                                setStatus(error.toString())
                            });
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
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
export default SignIn;
