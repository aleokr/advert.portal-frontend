import { Component } from "react";
import '../css/form.css'
import i18n from "../messages/i18n"
import logo from '../assets/logo_black.png'
import React from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../navigation/navBar.component";

type State = {
    name: string;
    errorMessage?: string;
    success: boolean;
};

let initialState: State = {
    name: '',
    errorMessage: '',
    success: false
}
type Action = { type: 'setName', payload: string }
    | { type: 'setSuccess', payload: string }
    | { type: 'setFailed', payload: string }
    | { type: 'setError', payload: string };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setName':
            return {
                ...state,
                name: action.payload
            };
        case 'setSuccess':
            return {
                ...state,
                errorMessage: '',
                success: true
            };
        case 'setFailed':
            return {
                ...state,
                errorMessage: action.payload
            };
        case 'setError':
            return {
                ...state,
                success: false,
                errorMessage: action.payload
            };
    }
}

const canSeePage: boolean = localStorage.getItem('access_token') !== '';

class NewTagView extends Component {
    state = initialState;

    dispatch(action: Action) {
        this.setState(state => reducer(this.state, action));
    }

    handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setName',
            payload: event.target.value
        });
    };

    handleAddNewTag = (event: React.FormEvent) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/tags/addTag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            body: JSON.stringify({
                name: this.state.name
            })
        })
            .then(response => {
                event.preventDefault();
                if (response.status === 401) {
                    this.dispatch({
                        type: 'setError',
                        payload: 'UNAUTHORIZED'
                    })
                    fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/auth/refreshToken',
                        {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('refresh_token')
                            }
                        })
                        .then(response => {
                            return response.json();
                        })
                        .then(result => {
                            localStorage.setItem('access_token', result.access_token);
                            localStorage.setItem('refresh_token', result.refresh_token);
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/tags/addTag', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                                },
                                body: JSON.stringify({
                                    name: this.state.name
                                })
                            })
                                .then(result => {
                                    if (result.status === 401) {
                                        this.dispatch({
                                            type: 'setError',
                                            payload: 'UNAUTHORIZED'
                                        })
                                        return response.json();
                                    }
                                    else {
                                        this.dispatch({
                                            type: 'setError',
                                            payload: 'UNAUTHORIZED'
                                        })
                                        return response.json();
                                    }
                                }
                                )
                        })
                } else return response.json();
            })
            .then(() => {
                if (this.state.errorMessage === '') {
                    this.dispatch({
                        type: 'setSuccess',
                        payload: ''
                    })
                }
            })
    }


    render() {
        return (

            <React.Fragment>
                <NavBar/>
                {this.state.errorMessage === '' && this.state.success === true &&
                    <Redirect to='/settings' />
                }
                {this.state.errorMessage === 'UNAUTHORIZED' &&
                    <Redirect to='/login' />
                }
                {canSeePage &&
                    <div className="form-box">
                        <img className="advert-black-logo" src={logo} alt='logo' />
                        <h2>{i18n.t('tag.tagTitle')}</h2>
                        <form onSubmit={this.handleAddNewTag} >
                            <div className="user-box">
                                <input type="text" maxLength={30} onChange={this.handleNameInput} required />
                                <label>{i18n.t('tag.name')}</label>
                            </div>
                            <button className="form-button" type="submit">{i18n.t('tag.submit')}</button>
                        </form>
                    </div>
                }
            </React.Fragment>
        );
    }


}

export default NewTagView;