import { Component } from "react";
import '../css/form.css'
import i18n from "../messages/i18n"
import logo from '../assets/logo_black.png'
import React from "react";
import { Redirect } from "react-router-dom";

type State = {
    name: string;
    description: string;
    errorMessage?: string;
    success: boolean;
};

let initialState: State = {
    name: '',
    description: '',
    errorMessage: '',
    success: false
}
type Action = { type: 'setName', payload: string }
    | { type: 'setDescription', payload: string }
    | { type: 'addCompanySuccess', payload: string }
    | { type: 'addCompanyFailed', payload: string }
    | { type: 'setError', payload: string };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setName':
            return {
                ...state,
                name: action.payload
            };
        case 'setDescription':
            return {
                ...state,
                description: action.payload
            };
        case 'addCompanySuccess':
            return {
                ...state,
                errorMessage: '',
                success: true
            };
        case 'addCompanyFailed':
            return {
                ...state,
                success: false,
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

const canSeePage: boolean = localStorage.getItem('access_token') !== '' && localStorage.getItem('user_type') === 'COMPANY_ADMIN' && localStorage.getItem('company_id') === null;

class NewCompanyForm extends Component {
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

    handleDescriptionInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.dispatch({
            type: 'setDescription',
            payload: event.target.value
        });
    };

    /* istanbul ignore next */ 
    handleAddNewCompany = (event: React.FormEvent) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/management/api/v1/companies/addCompany', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/management/api/v1/companies/addCompany', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                                },
                                body: JSON.stringify({
                                    name: this.state.name,
                                    description: this.state.description
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
                        type: 'addCompanySuccess',
                        payload: ''
                    })
                }
            })
    }


    render() {
        return (

            <React.Fragment>
                {this.state.errorMessage === '' && this.state.success === true &&
                    <Redirect to='/' />
                }
                {this.state.errorMessage === 'UNAUTHORIZED' &&
                    <Redirect to='/login' />
                }
                {canSeePage &&
                    <div className="form-box">
                        <img className="advert-black-logo" src={logo} alt='logo' />
                        <h2>{i18n.t('newCompany.addCompanyTitle')}</h2>
                        <form action="./addCompany" onSubmit={this.handleAddNewCompany} >
                            <div className="user-box">
                                <input type="text" maxLength={100} onChange={this.handleNameInput} required />
                                <label>{i18n.t('newCompany.name')}</label>
                            </div>
                            <div className="user-box">
                                <label>{i18n.t('newCompany.description')}</label>
                                <textarea rows={10} className="advert-area" maxLength={1000} onChange={this.handleDescriptionInput} required />
                            </div>
                            <button className="form-button" type="submit">{i18n.t('newCompany.addButton')}</button>
                        </form>
                    </div>
                }
            </React.Fragment>
        );
    }


}

export { initialState, reducer };
export default NewCompanyForm;