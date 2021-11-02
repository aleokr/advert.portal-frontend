import { Component } from "react";
import i18n from "../messages/i18n"
import "../css/company.component.css"
import companyImage from "../assets/company1.png"
import React from "react";

type CompanyUser = {
    id: number;
    name: string;
    surname: string;
    email: string;
};

type State = {
    id: number;
    name: string;
    description: string;
    logoPath: string;
    members: CompanyUser[];
    membersPage: number;
    requestToJoin: CompanyUser[];
    requestsPage: number;
    errorMessage: string;
    success: boolean;
};

let initialState: State = {
    id: 0,
    name: '',
    description: '',
    logoPath: '',
    members: [],
    membersPage: 0,
    requestToJoin: [],
    requestsPage: 0,
    errorMessage: '',
    success: false
}
type Action = { type: 'setError', payload: string };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setError':
            return {
                ...state,
                errorMessage: action.payload,
                success: false
            };
    }
}

class CompanyView extends Component {
    state = initialState;

    dispatch(action: Action) {
        this.setState(state => reducer(this.state, action));
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/companies/', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(response => {
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/companies/', {
                                method: 'GET',
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                                }
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
            .then(data => {
                if (this.state.errorMessage === '') {
                    this.setState({
                        id: data.id,
                        name: data.name,
                        description: data.description,
                        members: data.members,
                        requestToJoin: data.requestToJoin
                    })
                }
            })
    };

    acceptUserRequest = (id: number) => {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/management/api/v1/users/activate/' + id, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(response => {
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/management/api/v1/users/activate/' + id, {
                                method: 'GET',
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                                }
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
            .finally(() => this.loadData())
    };

    render() {
        return (
            <React.Fragment>
                <div className="companyPage">
                    <div className="company-profile">
                        <img src={companyImage} className="company-image" alt="Company Profile Image" />

                        <div className="companyLabel">{i18n.t('company.name')}</div>
                        <div className="companyName">{this.state.name}</div>
                        <div className="companyLabel">{i18n.t('company.description')}</div>
                        <div className="companyDescription">{this.state.description}</div>
                    </div>
                    <div className="company-tabs">

                        <div>
                            <h3 className="company-table-header">{i18n.t('company.companyMembers')}</h3>
                            <ul className="company-table">
                                <li className="table-header">
                                    <div className="col col-1">{i18n.t('company.userName')}</div>
                                    <div className="col col-2">{i18n.t('company.userSurname')}</div>
                                    <div className="col col-3">{i18n.t('company.userEmail')}</div>
                                </li>
                                {this.state.members.map(member => (
                                    <li className="table-row">
                                        <div className="col col-1">{member.name}</div>
                                        <div className="col col-2">{member.surname}</div>
                                        <div className="col col-3">{member.email}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {localStorage.getItem('company_id') === ('' + this.state.id) && localStorage.getItem('user_type') === 'COMPANY_ADMIN' &&
                            <div>
                                <h3 className="company-table-header">{i18n.t('company.requests')}</h3>
                                <ul className="company-table">
                                    <li className="table-header">
                                        <div className="col col-1">{i18n.t('company.userName')}</div>
                                        <div className="col col-2">{i18n.t('company.userSurname')}</div>
                                        <div className="col col-3">{i18n.t('company.userEmail')}</div>
                                        <div className="col col-4"></div>
                                    </li>
                                    {this.state.requestToJoin.map(request => (
                                        <li className="table-row">
                                            <div className="col col-1">{request.name}</div>
                                            <div className="col col-2">{request.surname}</div>
                                            <div className="col col-3">{request.email}</div>
                                            <button className="accept-user-button " onClick={() => this.acceptUserRequest(request.id)}>{i18n.t('company.accept')}</button>
                                        </li>
                                    ))}

                                    {this.state.requestToJoin.length === 0 &&
                                        <h4 className="no-data-header">{i18n.t('company.noData')}</h4>}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CompanyView;