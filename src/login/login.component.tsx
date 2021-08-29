import { Link, Redirect } from "react-router-dom";
import './form.css'
import { withTranslation } from "react-i18next";
import { Component } from "react";
import React from "react";

type State = {
    username: string;
    password: string;
    errorMessage?: string;
    success: boolean;
};

let initialState: State = {
    username: '',
    password: '',
    errorMessage: '',
    success: false
}

type Action = { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'loginSuccess', payload: string }
    | { type: 'loginFailed', payload: string }
    | { type: 'setError', payload: string };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setUsername':
            return {
                ...state,
                username: action.payload
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload
            };
        case 'loginSuccess':
            return {
                ...state,
                errorMessage: '',
                success: true
            };
        case 'loginFailed':
            return {
                ...state,
                success: false,
                errorMessage: action.payload
            };
        case 'setError':
            return {
                ...state,
                errorMessage: action.payload
            };
    }
}

class LoginView extends Component {
    state = initialState;

    dispatch(action: Action) {
        this.setState(state => reducer(this.state, action));
    }

    handleUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setUsername',
            payload: event.target.value
        });
    };

    handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setPassword',
            payload: event.target.value
        });
    };

    handleSubmitLogin = (event: React.FormEvent) => {
        event.preventDefault();

        const loginRequestOptions = {
            method: 'POST',
            body: new URLSearchParams({
                'username': this.state.username,
                'password': this.state.password
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        }

        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/auth', loginRequestOptions)
            .then(response => {
                if (!response.ok) {
                    event.preventDefault();
                    this.dispatch({
                        type: 'loginFailed',
                        payload: 'login failed'

                    })
                    return Promise.reject('error code: ' + response.status)
                } else return response.json();
            })
            .then(result => {
                localStorage.setItem('access_token', result.access_token);
                localStorage.setItem('refresh_token', result.refresh_token);
                this.dispatch({
                    type: 'loginSuccess',
                    payload: ''
                })
            })
    }


    render() {
        return (
            <React.Fragment>
                {this.state.success &&
                    <Redirect to='/' />
                }

                {this.state.errorMessage !== '' &&
                    <div className="error_message">
                        Error message
                    </div>}
                < div className="form-box" >
                    <h2>Advert portal</h2>
                    <form>
                        <div className="user-box">
                            <input type="text" onChange={this.handleUsernameInput} required />
                            <label>Username</label>
                        </div>
                        <div className="user-box">
                            <input type="password" onChange={this.handlePasswordInput} required />
                            <label>Password</label>
                        </div>
                        <a href="button" onClick={this.handleSubmitLogin}>Sign in</a>
                        <h3>or</h3>
                        <Link to="/register" >Register</Link>
                    </form>
                </div >
            </React.Fragment>
        );
    }
}

export default withTranslation('login')(LoginView)