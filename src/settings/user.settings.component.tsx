import "../css/user.component.css"
import userImage from "../assets/user.png"
import i18n from "../messages/i18n"
import React from "react";
import Select, { ValueType } from "react-select";

type Tag = {
    id: number;
    name: string;
};

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
    ownData: boolean;
    editMode: boolean;
    tags: Tag[];
    tagsToSubscribe: Tag[];
    selectedIds: number[];
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
    ownData: false,
    editMode: false,
    tags: [],
    tagsToSubscribe: [],
    selectedIds: [],
    errorMessage: '',
    success: false
}
const path: string = "http://172.18.0.2:9000/adverts/T2fFgm9zemVuaWUgeiBvYnJhemtpZW0gdXBkYXRlYWR2ZXJ0czE2MzcwOTYzNDMyMDg%3D?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=W48TZWOPBJYAT6LMS2QK%2F20211128%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211128T173213Z&X-Amz-Expires=604799&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJXNDhUWldPUEJKWUFUNkxNUzJRSyIsImV4cCI6MTYzODEyNDMwNiwicG9saWN5IjoiY29uc29sZUFkbWluIn0.VWTarOLf90SUlP3nQHW5WuzfjDOUhOEjyGQwaMadKzbqGa_sNJIoRZtMUfj0OUNGhBmOt-G3uMo0SDijClG4AQ&X-Amz-SignedHeaders=host&versionId=null&X-Amz-Signature=bd5b909f68f05e42c82b029a84f5b7a4a77c7bea94e48d4fa7fbcaf297f15f09";

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



class UserView extends React.Component<any>  {
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
        this.state.ownData = props.ownData;
    };

    loadData = () => {
        const path = this.state.ownData ? '/api/v1/users/loggedUser' : '/api/v1/users/' + this.state.id;

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
                        surname: data.surname,
                        email: data.email,
                        login: data.login,
                        advertsCount: data.advertsCount,
                        responsesCount: data.responsesCount,
                        applicationsCount: data.applicationsCount,
                        tags: data.tags
                    })
                }
            })

        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/tags/availableTags', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ tagsToSubscribe: data });
            });
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


    handleTagInputChange = (event: ValueType<Tag, true>) => {
        let list: Array<any> = event as Array<Tag>;
        let tags: number[] = [];

        list.forEach(element => {
            tags.push(element.value);
        });
        console.log(list);
        console.log(tags);
        this.setState({ selectedIds: tags });
    }

    subscribeTags = () => {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/tags/addResourceTag', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            body: JSON.stringify({
                tagIds: this.state.selectedIds,
                type: 'USER'
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/tags/addResourceTag', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                                },
                                body: JSON.stringify({
                                    tagIds: this.state.tagsToSubscribe,
                                    type: 'USER'
                                })
                            })
                        })
                }
            })
            .then(data => {
                if (this.state.errorMessage === '') {
                    window.location.reload();
                }
            })

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
                    <img src={userImage} className="user-image" />
                    {this.state.editMode && <div>
                        <label className="file-label">{i18n.t('user.addAttachment')}</label>
                        <label htmlFor="filePicker" className="file-picker">{i18n.t('user.choose')}</label>
                        <label htmlFor="filePicker" className="file-label"></label>
                        <input type="file" id="filePicker" accept="image/png" style={{ visibility: "hidden" }}
                            onChange={(e) => e.target.files != null ? "" : ""} />
                    </div>}
                    {!this.state.editMode &&
                        <div>
                            <label className="user-label" >{i18n.t('user.files')}</label>
                            <a className="main-file" href="https://www.google.com" >{i18n.t('user.mainFile')}</a>
                        </div>}
                    {this.state.editMode && <div>
                        <label className="file-label">{i18n.t('user.addImage')}</label>
                        <label htmlFor="filePicker" className="file-picker">{i18n.t('user.choose')}</label>
                        <label htmlFor="filePicker" className="file-label"></label>
                        <input type="file" id="filePicker" accept="image/png" style={{ visibility: "hidden" }}
                            onChange={(e) => e.target.files != null ? "" : ""} />
                    </div>}
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
                            {this.state.ownData &&
                                <div>
                                    <label className="user-label">{i18n.t('user.login')}</label>
                                    <div className="user-input">{this.state.login}</div>
                                </div>
                            }
                        </div>
                    }
                    {this.state.editMode && this.state.ownData &&
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
                <div className="stats">
                    <div className="statistic-label">{i18n.t('user.tags')}</div>
                    <div className="tag-label">{i18n.t('user.subscribedTags')}</div>
                    {this.state.tags.length > 0 && <div>
                        <div className="tags">{this.state.tags.map(tag => <div className="tag">{tag.name} </div>)}</div>
                    </div>
                    }
                    <div className="tag-label">{i18n.t('user.subscribeTags')}</div>
                    <Select className="multi-select"
                        closeMenuOnSelect={false}
                        placeholder={i18n.t('newAdvert.select')}
                        noOptionsMessage={() => i18n.t('newAdvert.noOptions')}
                        isMulti
                        onChange={e => this.handleTagInputChange(e)}
                        options={this.state.tagsToSubscribe}
                    />
                    <button className="tag-button" onClick={this.subscribeTags}>{i18n.t('user.subscribe')}</button>
                    <div>
                        <h3 className="or-label">{i18n.t('user.or')} </h3>
                    </div>
                    <a className="tag-ref" href="/addTag" >{i18n.t('user.create')}</a>

                </div>
                <div>
                    {!this.state.editMode && this.state.ownData &&
                        <button className="setting-button" onClick={this.editMode.bind(this)}>{i18n.t('user.edit')}</button>
                    }
                    {this.state.editMode && this.state.ownData &&

                        <button className="setting-button" onClick={this.submitChanges.bind(this)}>{i18n.t('user.submit')}</button>
                    }
                </div>
            </div >
        );
    }
}

export default UserView;