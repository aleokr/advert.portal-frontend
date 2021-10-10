import { Component } from "react";
import "../css/user.component.css"
import userImage from "../assets/user.png"
import i18n from "../messages/i18n"

type State = {
    id: number;
    name: string;
    surname: string;
    email: string;
    login: string;
    password: string;
    confirmPassword: string;
    advertsCount: number;
    responsesCount: number;
    applicationsCount: number;
    editMode: boolean;
    errorMessage?: string;
    success: boolean;
};

let initialState: State = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    login: '',
    password: '',
    confirmPassword: '',
    advertsCount: 0,
    responsesCount: 0,
    applicationsCount: 0,
    editMode: false,
    errorMessage: '',
    success: false
}

type Action = { type: 'setName', payload: string }
    | { type: 'setSurname', payload: string }
    | { type: 'setEmail', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setConfirmPassword', payload: string }
    | { type: 'setSuccess', payload: boolean }
    | { type: 'setEditMode', payload: boolean }
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
        case 'setConfirmPassword':
            return {
                ...state,
                confirmPassword: action.payload
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



class UserView extends Component {
    state = initialState;

    dispatch(action: Action) {
        this.setState(state => reducer(this.state, action));
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/users/loggedUser', {
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/users/loggedUser', {
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
                        surname: data.surname,
                        email: data.email,
                        login: data.login,
                        advertsCount: data.advertsCount,
                        responsesCount: data.responsesCount,
                        applicationsCount: data.applicationsCount
                    })
                }
            })
    };
    editMode() {
        this.dispatch({
            type: 'setEditMode',
            payload: true
        });
    }
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

    handleConfirmPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setConfirmPassword',
            payload: event.target.value
        });
    };

    submitChanges() {
        {
            this.state.password === this.state.confirmPassword &&
            fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/management/api/v1/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                },
                body: JSON.stringify({
                    id: this.state.id,
                    name: this.state.name,
                    surname: this.state.surname,
                    login: this.state.login,
                    email: this.state.email,
                    password: this.state.password
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
                                fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/management/api/v1/users/update', {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                                    },
                                    body: JSON.stringify({
                                        id: this.state.id,
                                        name: this.state.name,
                                        surname: this.state.surname,
                                        login: this.state.login,
                                        email: this.state.email,
                                        password: this.state.password
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
                            surname: data.surname,
                            login: data.login,
                            email: data.email,
                            editMode: false
                        })
                    }
                });

        }

    }



    render() {
        return (

            <div className="center">
                <div className="profile">
                    <img src={userImage} className="user-image" alt="Jessica Potter" />
                </div>
                <div className="user-data">
                    {!this.state.editMode &&
                        <div>
                            <label className="user-label">{i18n.t('user.name')}</label>
                            <div className="user-input">{this.state.name}</div>
                            <label className="user-label">{i18n.t('user.surname')}</label>
                            <div className="user-input">{this.state.surname}</div>
                            <label className="user-label">{i18n.t('user.email')}</label>
                            <div className="user-input">{this.state.email}</div>
                            <label className="user-label">{i18n.t('user.login')}</label>
                            <div className="user-input">{this.state.login}</div>
                        </div>
                    }
                    {this.state.editMode &&
                        <div>
                            <label className="user-label" >{i18n.t('user.name')}</label>
                            <input className="user-input-edit" type="text" defaultValue={this.state.name} onChange={this.handleNameInput} />
                            <label className="user-label">{i18n.t('user.surname')}</label>
                            <input className="user-input-edit" type="text" defaultValue={this.state.surname} onChange={this.handleSurnameInput} />
                            <label className="user-label">{i18n.t('user.email')}</label>
                            <input className="user-input-edit" type="text" defaultValue={this.state.email} onChange={this.handleEmailInput} />
                            <label className="user-label">{i18n.t('user.login')}</label>
                            <div className="user-input">{this.state.login}</div>
                            <label className="user-label">{i18n.t('user.password')}</label>
                            <input className="user-input-edit" type="password" onChange={this.handlePasswordInput} />
                            <label className="user-label">{i18n.t('user.repeatPassword')}</label>
                            <input className="user-input-edit" type="password" onChange={this.handleConfirmPasswordInput} />
                        </div>
                    }

                </div>

                <div className="stats">
                    <div className="statistic-label">{i18n.t('user.statistics')}</div>
                    <div className="box">
                        <span className="value">{this.state.advertsCount}</span>
                        <span className="parameter">{i18n.t('user.adverts')}</span>
                    </div>
                    <div className="box">
                        <span className="value">{this.state.responsesCount}</span>
                        <span className="parameter">{i18n.t('user.responses')}</span>
                    </div>
                    <div className="box">
                        <span className="value">{this.state.applicationsCount}</span>
                        <span className="parameter">{i18n.t('user.applications')}</span>
                    </div>
                </div>
                <div>
                    {!this.state.editMode &&
                        <button className="setting-button" onClick={this.editMode.bind(this)}>{i18n.t('user.edit')}</button>
                    }
                    {this.state.editMode &&
                        <button className="setting-button" onClick={this.submitChanges.bind(this)}>{i18n.t('user.submit')}</button>
                    }
                </div>
            </div>
        );
    }
}

export default UserView;