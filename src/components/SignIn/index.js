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


    showOrHidePassword = () => {
        const password = document.getElementById('signInPassword');
        if (password.type === 'password') {
            password.type = 'text';
        } else {
            password.type = 'password';
        }
    };

    render() {
        return (
            <div>
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
                            .catch(error => {
                                setSubmitting(false);
                                if (error.response) {
                                    if (error.response.status === 401) {
                                        setStatus("Your email or password is incorrect.");
                                    }
                                }else{
                                    setStatus("Something goes wrong!\nCheck your connection and try again.");
                                }
                            });
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group" style={{paddingTop:"20px"}}>
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signInPassword">Password</label>
                                <Field id="signInPassword" name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <span onClick={this.showOrHidePassword} className="fa fa-fw fa-eye field-icon toggle-password" />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>Login</button>
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
