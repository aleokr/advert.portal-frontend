import { Component } from "react";
import '../css/form.css'
import '../css/userPanel.component.css'

import i18n from "../messages/i18n"
import React from "react";
import NavBar from "../navigation/navBar.component"
import CompanyView from "./userPanelCompany.component"
import { RouteComponentProps, withRouter } from "react-router-dom";
import ReactPaginate from "react-paginate";
type Advert = {
    id: number;
    title: string;
    shortDescription: string;
    createdAt: string;
    advertCategory: string;
    archived: boolean;
}

type Application = {
    advertId: number;
    advertTitle: string;
    advertShortDescription: string;
    createdAt: string;
    advertCategory: string;
    advertType: string;
    addedBy: string;
    userId: number;
    companyId: number;
}

type State = {
    companyAdmin: boolean;
    userAdvertsPage: number;
    userApplicationsPage: number;
    userResponsesPage: number;
    userAdvertsPagesCount: number;
    userApplicationsPagesCount: number;
    userResponsesPagesCount: number;
    userAdverts: Advert[];
    userApplications: Application[];
    userResponses: Application[];
    tabIndex: number;
    errorMessage?: string;
    success: boolean;
};

let initialState: State = {
    companyAdmin: true,
    userAdvertsPage: 0,
    userApplicationsPage: 0,
    userResponsesPage: 0,
    userAdvertsPagesCount: 0,
    userApplicationsPagesCount: 0,
    userResponsesPagesCount: 0,
    userAdverts: [],
    userApplications: [],
    userResponses: [],
    tabIndex: 1,
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

const token: boolean = localStorage.getItem('access_token') !== '';

class UserPanelView extends React.Component<RouteComponentProps> {

    state = initialState;

    dispatch(action: Action) {
        this.setState(state => reducer(this.state, action));
    }

    componentDidMount() {
        this.loadUserAdverts();
    }

    loadUserAdverts = () => {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL +
            '/api/v1/adverts/getAdverts?offset=' + 10 * this.state.userAdvertsPage + '&limit=10', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
                    this.setState({
                        userAdverts: data.adverts,
                        userAdvertsPage: data.paging.page,
                        userAdvertsPagesCount: data.paging.pagesCount,
                        tabIndex: 1
                    });
                }
            })
    }

    loadUserAppliactions = () => {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL +
            '/api/v1/applications/userApplications?offset=' + 10 * this.state.userApplicationsPage + '&limit=10', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
                    this.setState({
                        userApplications: data.applications,
                        userApplicationsPage: data.paging.page,
                        userApplicationsPagesCount: data.paging.pagesCount,
                        tabIndex: 2
                    });
                }
            })
    }

    loadUserResponses = () => {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL +
            '/api/v1/applications/userResponses?offset=' + 10 * this.state.userResponsesPage + '&limit=10', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
                    this.setState({
                        userResponses: data.applications,
                        userResponsesPage: data.paging.page,
                        userResponsesPagesCount: data.paging.pagesCount,
                        tabIndex: 3
                    }
                    );
                }
            })
    }
    loadCompany = () => {
        this.setState({
            tabIndex: 4
        }
        );
    }
    advertDetails = (id: number) => {
        this.props.history.push('/details/' + id);
    };

    addedByDetails = (userId: number, companyId: number, advertType: string) => {
        if (advertType === 'INDIVIDUAL' && companyId !== null) {
            this.props.history.push('/company/' + companyId);
        }
        if (advertType === 'COMPANY' && userId !== null) {
            this.props.history.push('/user/' + userId);
        }
    };
    handleUserAdvertsPage = (e: any) => {
        this.setState({
            userAdvertsPage: e.selected,
        }, () => {
            this.loadUserAdverts();
        });
    };

    handleUserApplicationsPage = (e: any) => {
        this.setState({
            userApplicationsPage: e.selected,
        }, () => {
            this.loadUserAppliactions();
        });
    };

    handleUserResponsesPage = (e: any) => {
        this.setState({
            userResponsesPage: e.selected,
        }, () => {
            this.loadUserResponses();
        });
    };

    deleteAdvert = (id: number) => {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL +
            '/api/v1/adverts/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL +
                                '/api/v1/adverts/' + id, {
                                method: 'DELETE',
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
                } else return response;
            })
            .then(() => {
                if (this.state.errorMessage === '') {
                    this.loadUserAdverts();
                }
            })
    };

    archiveAdvert = (id: number) => {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL +
            '/api/v1/adverts/archive/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(response => {
                if (response.status === 401) {
                    this.dispatch({
                        type: 'setError',
                        payload: 'UNAUTHORIZED'
                    })
                    fetch(process.env.REACT_APP_BACKEND_BASE_URL +
                        '/api/v1/adverts/archive/' + id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                        }
                    })
                        .then(response => {
                            return response.json();
                        })
                        .then(result => {
                            localStorage.setItem('access_token', result.access_token);
                            localStorage.setItem('refresh_token', result.refresh_token);
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL +
                                '/api/v1/adverts/' + id, {
                                method: 'DELETE',
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
                } else return response;
            })
            .then(() => {
                if (this.state.errorMessage === '') {
                    this.loadUserAdverts();
                }
            })
    };

    render() {
        return (
            <div>
                <NavBar />
                {token &&
                    <div className="panel-list-body">
                        <div className="panel-tabs">

                            <label className="tab-2">
                                <label htmlFor="tab2-1">{i18n.t('userPanel.firstTab')}</label>
                                <input id="tab2-1" name="tabs-two" type="radio" onChange={this.loadUserAdverts} defaultChecked />
                                {this.state.tabIndex === 1 &&
                                    <div>
                                        <ul className="responsive-table">
                                            <li className="table-header">
                                                <div className="col col-1">{i18n.t('userPanel.name')}</div>
                                                <div className="col col-2">{i18n.t('userPanel.shortDescription')}</div>
                                                <div className="col col-3">{i18n.t('userPanel.createdAt')}</div>
                                                <div className="col col-4">{i18n.t('userPanel.category')}</div>
                                                <div className="col col-4"></div>
                                                <div className="col col-4"></div>
                                            </li>

                                            {this.state.userAdverts.map(advert => (
                                                advert.archived ?
                                                    <li className="table-row-archived">
                                                        <div className="col col-1" onClick={() => this.advertDetails(advert.id)}>{advert.title}</div>
                                                        <div className="col col-2">{advert.shortDescription}</div>
                                                        <div className="col col-3">{advert.createdAt}</div>
                                                        <div className="col col-4">{i18n.t('categories.' + advert.advertCategory)}</div>
                                                        <div className="col col-4"></div>
                                                        <div className="col col-4"></div>
                                                    </li> :
                                                    <li className="table-row">
                                                        <div className="col col-1" onClick={() => this.advertDetails(advert.id)}>{advert.title}</div>
                                                        <div className="col col-2">{advert.shortDescription}</div>
                                                        <div className="col col-3">{advert.createdAt}</div>
                                                        <div className="col col-4">{i18n.t('categories.' + advert.advertCategory)}</div>
                                                        <button className="user-panel-action-button col col-4" onClick={() => this.deleteAdvert(advert.id)} >{i18n.t('userPanel.delete')}</button>
                                                        <button className="user-panel-action-button col col-4" onClick={() => this.archiveAdvert(advert.id)} >{i18n.t('userPanel.archive')}</button>
                                                    </li>
                                            ))}
                                        </ul>
                                        {this.state.userAdvertsPagesCount > 1 &&
                                            <ReactPaginate
                                                previousLabel={i18n.t('pagination.previous')}
                                                nextLabel={i18n.t('pagination.next')}
                                                breakLabel={"..."}
                                                breakClassName={"break-me"}
                                                pageCount={this.state.userAdvertsPagesCount}
                                                marginPagesDisplayed={1}
                                                pageRangeDisplayed={2}
                                                onPageChange={this.handleUserAdvertsPage}
                                                containerClassName={"pagination"}
                                                activeClassName={"active"} />
                                        }
                                    </div>}
                            </label>
                            <label className="tab-2">
                                <div className="tab-2-2">
                                    <label htmlFor="tab2-2">{i18n.t('userPanel.secondTab')}</label>
                                    <input id="tab2-2" name="tabs-two" type="radio" onChange={this.loadUserAppliactions.bind(this)} />
                                    {this.state.tabIndex === 2 &&
                                        <div>
                                            <ul className="responsive-table">
                                                <li className="table-header">
                                                    <div className="col col-1">{i18n.t('userPanel.name')}</div>
                                                    <div className="col col-2">{i18n.t('userPanel.shortDescription')}</div>
                                                    <div className="col col-3">{i18n.t('userPanel.category')}</div>
                                                    <div className="col col-4">{i18n.t('userPanel.addedAt')}</div>
                                                </li>
                                                {this.state.userApplications.map(application => (
                                                    <li className="table-row" onClick={() => this.advertDetails(application.advertId)}>
                                                        <div className="col col-1">{application.advertTitle}</div>
                                                        <div className="col col-2">{application.advertShortDescription}</div>
                                                        <div className="col col-3">{i18n.t('categories.' + application.advertCategory)}</div>
                                                        <div className="col col-3">{application.createdAt}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                            {this.state.userApplicationsPagesCount > 1 &&
                                                <ReactPaginate
                                                    previousLabel={i18n.t('pagination.previous')}
                                                    nextLabel={i18n.t('pagination.next')}
                                                    breakLabel={"..."}
                                                    breakClassName={"break-me"}
                                                    pageCount={this.state.userApplicationsPagesCount}
                                                    marginPagesDisplayed={1}
                                                    pageRangeDisplayed={2}
                                                    onPageChange={this.handleUserApplicationsPage}
                                                    containerClassName={"pagination"}
                                                    activeClassName={"active"} />
                                            }
                                        </div>}
                                </div>


                            </label>
                            <label className="tab-2">

                                <div className="tab-2-3">
                                    <label htmlFor="tab2-3">{i18n.t('userPanel.thirdTab')}</label>
                                    <input id="tab2-3" name="tabs-two" type="radio" onChange={this.loadUserResponses.bind(this)} />
                                    {this.state.tabIndex === 3 &&
                                        <div>
                                            <ul className="responsive-table">
                                                <li className="table-header">
                                                    <div className="col col-1">{i18n.t('userPanel.name')}</div>
                                                    <div className="col col-2">{i18n.t('userPanel.shortDescription')}</div>
                                                    <div className="col col-3">{i18n.t('userPanel.addedAt')}</div>
                                                    <div className="col col-3">{i18n.t('userPanel.addedBy')}</div>
                                                </li>
                                                {this.state.userResponses.map(application => (
                                                    <li className="table-row" onClick={() => this.addedByDetails(application.userId, application.companyId, application.advertType)}>
                                                        <div className="col col-1">{application.advertTitle}</div>
                                                        <div className="col col-2">{application.advertShortDescription}</div>
                                                        <div className="col col-3">{application.createdAt}</div>
                                                        <div className="col col-4">{application.addedBy}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                            {this.state.userResponsesPagesCount > 1 &&
                                                <ReactPaginate
                                                    previousLabel={i18n.t('pagination.previous')}
                                                    nextLabel={i18n.t('pagination.next')}
                                                    breakLabel={"..."}
                                                    breakClassName={"break-me"}
                                                    pageCount={this.state.userResponsesPagesCount}
                                                    marginPagesDisplayed={1}
                                                    pageRangeDisplayed={2}
                                                    onPageChange={this.handleUserResponsesPage}
                                                    containerClassName={"pagination"}
                                                    activeClassName={"active"} />
                                            }
                                        </div>}
                                </div>
                            </label>
                            {localStorage.getItem('company_id') !== null &&
                                <div className="tab-2">
                                    <div className="tab-2-4">
                                        <label htmlFor="tab2-4">{i18n.t('userPanel.fourthTab')}</label>
                                        <input id="tab2-4" name="tabs-two" type="radio" onChange={this.loadCompany.bind(this)} />
                                        {this.state.tabIndex === 4 &&
                                            <CompanyView />}
                                    </div>
                                </div>
                            }

                        </div>
                    </div>}
            </div>
        );
    }
}
export default withRouter(UserPanelView);