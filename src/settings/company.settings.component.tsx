import { Component } from "react";
import "../css/user.component.css"
import companyImage from "../assets/company.png"
import i18n from "../messages/i18n"
import React from "react";
import ReactPaginate from "react-paginate";


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
    ownCompany: boolean;
    editMode: boolean;
    errorMessage?: string;
    success: boolean;
};

let initialState: State = {
    id: 0,
    name: '',
    description: '',
    logoPath: '',
    members: [],
    ownCompany: false,
    editMode: false,
    errorMessage: '',
    success: false
}

type Action = { type: 'setSuccess', payload: boolean }
    | { type: 'setEditMode', payload: boolean }
    | { type: 'setName', payload: string }
    | { type: 'setDescription', payload: string }
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
        case 'setEditMode':
            return {
                ...state,
                editMode: action.payload
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



class CompanyView extends React.Component<any> {

    state = initialState;

    dispatch(action: Action) {
        this.setState(state => reducer(this.state, action));
    }

    componentDidMount() {
        this.setParams(this.props)
        this.loadData();
    }

    setParams = (props: any) => {
        this.state.id = props.id;
        this.state.ownCompany = props.ownCompany;
    };

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

    editMode() {
        this.dispatch({
            type: 'setEditMode',
            payload: true
        });
    }

    submitChanges() {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/management/api/v1/companies/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            body: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                description: this.state.description
            })
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/management/api/v1/companies/update', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                                },
                                body: JSON.stringify({
                                    title: this.state.id,
                                    shortDescription: this.state.name,
                                    longDescription: this.state.description
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
            .then(data => {
                if (this.state.errorMessage === '') {
                    this.setState({
                        id: data.id,
                        name: data.name,
                        description: data.description
                    })
                }
            });

        this.dispatch({
            type: 'setEditMode',
            payload: false
        });
    }

    loadData = () => {
        const path  = this.state.ownCompany ? '/api/v1/companies/' : '/api/v1/companies/' + this.state.id;
        
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + path, {
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL + path, {
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
                        members: data.members
                    })
                }
            })
    };

    deleteUser = (id: number) => {
        console.log('delee')
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/management/api/v1/users/' + id, {
            method: 'DELETE',
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/management/api/v1/users/' + id, {
                                method: 'DELETE',
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
    }

    render() {
        return (

            <div className="center">
                <div className="profile">
                    <img src={companyImage} className="user-image" alt="Jessica Potter" />
                    {!this.state.editMode &&
                        <div>
                            <label className="user-label">{i18n.t('company.name')}</label>
                            <div className="user-input">{this.state.name}</div>
                            <label className="user-label">{i18n.t('company.description')}</label>
                            <div className="user-input">{this.state.description} </div>
                        </div>
                    }
                    {this.state.editMode && this.state.ownCompany &&
                        <div>
                            <label className="user-label" >{i18n.t('company.name')}</label>
                            <input className="user-input-edit" type="text" defaultValue={this.state.name} onChange={this.handleNameInput} />
                            <label className="user-label" >{i18n.t('company.description')}</label>
                            <textarea rows={10} className="user-input-edit" defaultValue={this.state.description} onChange={this.handleDescriptionInput} />
                        </div>
                    }
                </div>

                <div className="company-tabs">
                    <h3 className="company-table-header">{i18n.t('company.companyMembers')}</h3>
                    <ul className="company-table">
                        <li className="table-header">
                            <div className="col col-1">{i18n.t('company.userName')}</div>
                            <div className="col col-2">{i18n.t('company.userSurname')}</div>
                            <div className="col col-3">{i18n.t('company.userEmail')}</div>
                            {this.state.editMode &&
                                <div className="col col-4"></div>}
                        </li>
                        {this.state.members.map(member => (
                            <li className="table-row">
                                <div className="col col-1">{member.name}</div>
                                <div className="col col-2">{member.surname}</div>
                                <div className="col col-3">{member.email}</div>
                                {this.state.editMode && this.state.ownCompany && 
                                    <button className="accept-user-button" onClick={() => this.deleteUser(member.id)} >{i18n.t('company.delete')}</button>}
                            </li>
                        ))}

                        {this.state.members.length === 0 &&
                            <h4 className="no-data-header">{i18n.t('company.noData')}</h4>}
                    </ul>
                </div>
                <div>
                    {!this.state.editMode && this.state.ownCompany &&
                        <button className="setting-button" onClick={this.editMode.bind(this)}>{i18n.t('user.edit')}</button>
                    }
                    {this.state.editMode && this.state.ownCompany &&
                        <button className="setting-button" onClick={this.submitChanges.bind(this)}>{i18n.t('user.submit')}</button>
                    }

                </div>

            </div>


        );
    }


}

export default CompanyView;