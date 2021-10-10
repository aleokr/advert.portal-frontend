import { Link, Redirect } from "react-router-dom";
import '../css/form.css'
import { Component } from "react";
import React from "react";
import i18n from "../messages/i18n"
import logo from '../assets/logo_black.png';

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
                fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/users/loggedUser', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            event.preventDefault();
                            this.dispatch({
                                type: 'loginFailed',
                                payload: 'get user info failed'

                            })
                            return Promise.reject('error code: ' + response.status)
                        } else return response.json();
                    })
                    .then(result => {
                        localStorage.setItem('user_type', result.type);
                        if (result.companyId !== null && result.active === true) {
                            localStorage.setItem('company_id', result.companyId);
                        } else {
                            localStorage.removeItem('company_id')
                        }
                        console.log(localStorage.getItem('company_id') === null)
                        this.dispatch({
                            type: 'loginSuccess',
                            payload: ''
                        })
                    })
            })

    }


    render() {
        return (
            <React.Fragment>
                {this.state.success && localStorage.getItem('user_type') === 'COMPANY_ADMIN' && localStorage.getItem('company_id') === null &&
                    <Redirect to='/addCompany' />
                }
                {this.state.success && !(localStorage.getItem('user_type') === 'COMPANY_ADMIN' && localStorage.getItem('company_id') === null) &&
                    <Redirect to='/' />
                }
                {!this.state.success && this.state.errorMessage !== '' &&
                    <div className="error_message">
                        {i18n.t('login.error')}
                    </div>}
                <div className="form-box">
                    <img className="advertBlackLogo" src={logo} alt='logo' />
                    <form action="./login" onSubmit={this.handleSubmitLogin}>
                        <div className="user-box">
                            <input type="text" onChange={this.handleUsernameInput} maxLength={100} required />
                            <label>{i18n.t('login.username')}</label>
                        </div>
                        <div className="user-box">
                            <input type="password" onChange={this.handlePasswordInput} maxLength={100} required />
                            <label>{i18n.t('login.password')}</label>
                        </div>
                        <button className="form-button" type="submit">{i18n.t('login.loginButton')}</button>
                        <h3>{i18n.t('login.or')}</h3>
                        <Link className="form-button" to="/register" >{i18n.t('login.registerButton')}</Link>
                    </form>
                </div >
            </React.Fragment>
        );
    }
}

export default LoginView;
