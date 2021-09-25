import { Component } from "react";
import '../css/form.css'
import '../css/userPanel.component.css'
import i18n from "../messages/i18n"
import React from "react";
import NavBar from "../navigation/navBar.component"

type Advert = {
    title: string;
    shortDescription: string;
    createdAt: string;
    advertCategory: string;
}

type Application = {
    advertTitle: string;
    advertShortDescription: string;
    createdAt: string;
    advertCategory: string;
    addedBy: string;
}

type State = {
    companyAdmin: boolean;
    userAdvertsPage: number;
    userApplicationsPage: number;
    userResponsesPage: number;
    userAdverts: Advert[];
    userApplications: Application[];
    userResponses: Application[];
    errorMessage?: string;
    success: boolean;
};

let initialState: State = {
    companyAdmin: true,
    userAdvertsPage: 0,
    userApplicationsPage: 0,
    userResponsesPage: 0,
    userAdverts: [],
    userApplications: [],
    userResponses: [],
    errorMessage: '',
    success: false
}

type Action = { type: 'setUserAdvertsPage', payload: number }
    | { type: 'setUserApplicationsPage', payload: number }
    | { type: 'setUserResponsesPage', payload: number }
    | { type: 'setSuccess', payload: boolean }
    | { type: 'setError', payload: string };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setUserAdvertsPage':
            return {
                ...state,
                userAdvertsPage: action.payload
            };
        case 'setUserApplicationsPage':
            return {
                ...state,
                userApplicationsPage: action.payload
            };
        case 'setUserResponsesPage':
            return {
                ...state,
                userResponsesPage: action.payload
            };
        case 'setSuccess':
            return {
                ...state,
                success: action.payload
            };
        case 'setError':
            return {
                ...state,
                errorMessage: action.payload
            };
    }
}

class UserPanelView extends Component {
    state = initialState;

    dispatch(action: Action) {
        this.setState(state => reducer(this.state, action));
    }

    loadUserAdverts = (event: React.FormEvent) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_BACKEND_BASE_URL +
            '/api/v1/adverts/getAdverts?offset=' + 10 * this.state.userAdvertsPage + '&limit=10', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL +
                                '/api/v1/adverts/getAdverts?offset=' + 10 * this.state.userAdvertsPage + '&limit=10', {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
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
                    this.setState({ userAdverts: data });
                }
            })
    }

    loadUserAppliactions = (event: React.FormEvent) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_BACKEND_BASE_URL +
            '/api/v1/applications/userApplications?offset=' + 10 * this.state.userApplicationsPage + '&limit=10', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL +
                                '/api/v1/applications/userApplications?offset=' + 10 * this.state.userApplicationsPage + '&limit=10', {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
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
                    this.setState({ userApplications: data });
                }
            })
    }

    loadUserResponses = (event: React.FormEvent) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_BACKEND_BASE_URL +
            '/api/v1/applications/userResponses?offset=' + 10 * this.state.userResponsesPage + '&limit=10', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL +
                                '/api/v1/applications/userResponses?offset=' + 10 * this.state.userResponsesPage + '&limit=10', {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
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
                    this.setState({ userResponses: data });
                }
            })
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <body className="panelListBody">
                    <div className="panelTabs">
                        <div className="tab-2">
                            <label htmlFor="tab2-1">{i18n.t('userPanel.firstTab')}</label>
                            <input id="tab2-1" name="tabs-two" type="radio" onChange={this.loadUserAdverts.bind(this)} />
                            <div>
                                <ul className="responsive-table">
                                    <li className="table-header">
                                        <div className="col col-1">{i18n.t('userPanel.name')}</div>
                                        <div className="col col-2">{i18n.t('userPanel.shortDescription')}</div>
                                        <div className="col col-3">{i18n.t('userPanel.createdAt')}</div>
                                        <div className="col col-4">{i18n.t('userPanel.category')}</div>
                                    </li>

                                    {this.state.userAdverts.map(advert => (
                                        <li className="table-row">
                                            <div className="col col-1">{advert.title}</div>
                                            <div className="col col-2">{advert.shortDescription}</div>
                                            <div className="col col-3">{advert.createdAt}</div>
                                            <div className="col col-4">{i18n.t('categories.' + advert.advertCategory)}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="tab-2">
                            <div className="tab-2-2">
                                <label htmlFor="tab2-2">{i18n.t('userPanel.secondTab')}</label>
                                <input id="tab2-2" name="tabs-two" type="radio" onChange={this.loadUserAppliactions.bind(this)} />
                                <div>
                                    <ul className="responsive-table">
                                        <li className="table-header">
                                            <div className="col col-1">{i18n.t('userPanel.name')}</div>
                                            <div className="col col-2">{i18n.t('userPanel.shortDescription')}</div>
                                            <div className="col col-3">{i18n.t('userPanel.category')}</div>
                                            <div className="col col-4">{i18n.t('userPanel.addedAt')}</div>
                                        </li>
                                        {this.state.userApplications.map(application => (
                                            <li className="table-row">
                                                <div className="col col-1">{application.advertTitle}</div>
                                                <div className="col col-2">{application.advertShortDescription}</div>
                                                <div className="col col-3">{i18n.t('categories.' + application.advertCategory)}</div>
                                                <div className="col col-3">{application.createdAt}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div className="tab-2">

                            <div className="tab-2-3">
                                <label htmlFor="tab2-3">{i18n.t('userPanel.thirdTab')}</label>
                                <input id="tab2-3" name="tabs-two" type="radio"  onChange={this.loadUserResponses.bind(this)} />
                                <div>
                                    <ul className="responsive-table">
                                        <li className="table-header">
                                            <div className="col col-1">{i18n.t('userPanel.name')}</div>
                                            <div className="col col-2">{i18n.t('userPanel.shortDescription')}</div>
                                            <div className="col col-3">{i18n.t('userPanel.addedAt')}</div>
                                            <div className="col col-3">{i18n.t('userPanel.addedBy')}</div>
                                        </li>
                                        {this.state.userResponses.map(application => (
                                            <li className="table-row">
                                                <div className="col col-1">{application.advertTitle}</div>
                                                <div className="col col-2">{application.advertShortDescription}</div>
                                                <div className="col col-3">{application.createdAt}</div>
                                                <div className="col col-4">{application.addedBy}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {this.state.companyAdmin &&
                            <div className="tab-2">
                                <div className="tab-2-4">
                                    <label htmlFor="tab2-4">{i18n.t('userPanel.fourthTab')}</label>
                                    <input id="tab2-4" name="tabs-two" type="radio" />
                                </div>
                            </div>
                        }

                    </div>
                </body>
            </React.Fragment>
        );
    }


}

export default UserPanelView;