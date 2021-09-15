import './form.css'
import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import React from 'react';
import i18n from "../messages/i18n"
import logo from '../assets/logo_black.png';

type CompaniesData = {
    id: number;
    name: string;
}

type UserType = {
    name: string;
}

type State = {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    userType: string;
    companyUser: boolean;
    companyAdmin: boolean;
    companyName: string;
    companyId: string;
    companies: CompaniesData[];
    userTypes: UserType[];
    errorMessage?: string;
    success: boolean;
};

let initialState: State = {
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    userType: 'INDIVIDUAL_USER',
    companyUser: false,
    companyAdmin: false,
    companyName: '',
    companyId: '',
    companies: [],
    userTypes: [],
    errorMessage: '',
    success: false
}


type Action = { type: 'setName', payload: string }
    | { type: 'setSurname', payload: string }
    | { type: 'setUsername', payload: string }
    | { type: 'setEmail', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setUserType', payload: string }
    | { type: 'setCompanyName', payload: string }
    | { type: 'setCompanyId', payload: string }
    | { type: 'registerSuccess', payload: string }
    | { type: 'registerFailed', payload: string }
    | { type: 'setError', payload: string };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setName':
            return {
                ...state,
                name: action.payload
            };
        case 'setSurname':
            return {
                ...state,
                surname: action.payload
            };
        case 'setUsername':
            return {
                ...state,
                username: action.payload
            };
        case 'setEmail':
            return {
                ...state,
                email: action.payload
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload
            };
        case 'setUserType':
            return {
                ...state,
                userType: action.payload,
                companyAdmin: action.payload === "COMPANY_ADMIN",
                companyUser: action.payload === "COMPANY_USER"
            };
        case 'setCompanyName':
            return {
                ...state,
                companyName: action.payload
            };
        case 'setCompanyId':
            return {
                ...state,
                companyId: action.payload
            };
        case 'registerSuccess':
            return {
                ...state,
                errorMessage: '',
                success: true
            };
        case 'registerFailed':
            return {
                ...state,
                errorMessage: action.payload
            };
        case 'setError':
            return {
                ...state,
                errorMessage: action.payload
            };
    }
}


class RegisterView extends Component {
    state = initialState;

    dispatch(action: Action) {
        this.setState(state => reducer(this.state, action));
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/companies/list')
            .then(response => response.json())
            .then(data => {
                this.setState({ companies: data });
            });

        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/users/roles')
            .then(response => response.json())
            .then(data => {
                this.setState({ userTypes: data });
            });

    }

    handleUserTypeInput(event: React.ChangeEvent<HTMLSelectElement>) {
        this.dispatch({
            type: 'setUserType',
            payload: event.target.value
        });

    };

    handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setName',
            payload: event.target.value
        });
    };

    handleSurnameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setSurname',
            payload: event.target.value
        });
    };

    handleUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setUsername',
            payload: event.target.value
        });
    };

    handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setEmail',
            payload: event.target.value
        });
    };

    handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setPassword',
            payload: event.target.value
        });
    };

    handleCompanyNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setCompanyName',
            payload: event.target.value
        });
    };

    handleCompanyIdInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.dispatch({
            type: 'setCompanyId',
            payload: event.target.value
        });
    };

    handleSubmitRegister = (event: React.FormEvent) => {
        event.preventDefault();


        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/management/api/v1/users/addUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
                name: this.state.name,
                surname: this.state.surname,
                login: this.state.username,
                email: this.state.email,
                password: this.state.password,
                userRole: this.state.userType,
                companyId: this.state.companyId
            })
        })
            .then(response => {
                event.preventDefault();
                if (!response.ok) {
                    event.preventDefault();
                    this.dispatch({
                        type: 'registerFailed',
                        payload: 'Register failed'

                    })
                    this.setState({ errorMessage: response.json().toString() });
                    return Promise.reject('error code: ' + response.status)
                } else return response.json();
            })
            .then(result => {
                this.dispatch({
                    type: 'registerSuccess',
                    payload: ''
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.success &&
                    <Redirect to='/login' />}

                {this.state.errorMessage !== '' &&
                    <div className="error_message">
                        {i18n.t('register.error')}
                    </div>}
                <div className="form-box">
                <img className="advertBlackLogo" src={logo} alt ='logo'/>
                    <form action="./login" onSubmit={this.handleSubmitRegister}>
                        <div className="user-box">
                            <input type="text" onChange={this.handleNameInput} required />
                            <label>{i18n.t('register.name')}</label>
                        </div>
                        <div className="user-box">
                            <input type="text" onChange={this.handleSurnameInput} required />
                            <label>{i18n.t('register.surname')}</label>
                        </div>
                        <div className="user-box">
                            <input type="text" onChange={this.handleUsernameInput} required />
                            <label>{i18n.t('register.username')}</label>
                        </div>
                        <div className="user-box">
                            <input type="email" onChange={this.handleEmailInput} required />
                            <label>{i18n.t('register.email')}</label>
                        </div>
                        <div className="user-box">
                            <input type="password" name="" onChange={this.handlePasswordInput} required />
                            <label>{i18n.t('register.password')}</label>
                        </div>
                        <div className="select-box">
                            <select onChange={e => this.handleUserTypeInput(e)} value={this.state.userType}>
                                {this.state.userTypes.map(type => (
                                    <option key={type.name} value={type.name}>
                                        {i18n.t('register.' + type.name)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {this.state.companyUser &&
                            <div className="select-box">
                                <select onChange={e => this.handleCompanyIdInput(e)} value={this.state.userType}>
                                    {this.state.companies.map(company => (
                                        <option key={company.name} value={company.id}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        }

                        <button className="form-button" type="submit">{i18n.t('register.submit')}</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }


}

export default RegisterView;
