import React, { Component } from 'react';
import interceptor from '../../helpers/interceptor';
import {AllRoutes} from "../AllRoutes";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidMount() {
            interceptor()
                .then( resp => {
                    console.log("All ok: "+resp)
                    this.setState({
                        hasError: true
                    })
                })
                .catch( error => {
                    console.log(error);
                this.setState({
                    hasError: true
                })
            })
    }

    render() {
        if(this.state.hasError){
            return <div>Something went wrong</div>
        }

        return (
            <div>
                <h1>I am parent</h1>
                <AllRoutes/>
            </div>
        );
    }
    componentDidCatch(error,errorInfo){
        this.setState({
            hasError:true
        })
    }
}
export default ErrorBoundary;