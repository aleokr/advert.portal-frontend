import '../css/form.css'
import React from "react";
import NavBar from "../navigation/navBar.component"
import { RouteComponentProps, withRouter } from 'react-router-dom';
import "../css/advertDetails.component.css"
import advertOwnerImage from "../assets/company.png"
import i18n from "../messages/i18n"


type Tag = {
    id: number;
    name: string;
};

type State = {
    advertId: number;
    advertTitle: string;
    advertDescription: string;
    advertShortDescription: string;
    advertCreatedAt: string;
    advertType: string;
    advertCategory: string;
    ownerId: number;
    ownerName: string;
    canApplicate: boolean;
    applicationExists: boolean;
    canEdit: boolean;
    editMode: boolean;
    tags: Tag[];
    errorMessage?: string;
    success: boolean;
};

let initialState: State = {
    advertId: 0,
    advertTitle: '',
    advertDescription: '',
    advertShortDescription: '',
    advertCreatedAt: '',
    advertType: '',
    advertCategory: '',
    ownerName: '',
    ownerId: 0,
    canApplicate: false,
    applicationExists: true,
    canEdit: false,
    editMode: false,
    tags: [],
    errorMessage: '',
    success: false
}

type Action = { type: 'setTitle', payload: string }
    | { type: 'setShortDescription', payload: string }
    | { type: 'setLongDescription', payload: string }
    | { type: 'setSuccess', payload: boolean }
    | { type: 'setEditMode', payload: boolean }
    | { type: 'setCanApplicate', payload: boolean }
    | { type: 'setApplicationExists', payload: boolean }
    | { type: 'setError', payload: string };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setTitle':
            return {
                ...state,
                advertTitle: action.payload
            };
        case 'setShortDescription':
            return {
                ...state,
                advertShortDescription: action.payload
            };
        case 'setLongDescription':
            return {
                ...state,
                advertDescription: action.payload
            };
        case 'setEditMode':
            return {
                ...state,
                editMode: action.payload
            };
        case 'setCanApplicate':
            return {
                ...state,
                canApplicate: action.payload
            };
        case 'setApplicationExists':
            return {
                ...state,
                applicationExists: action.payload
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

class AdvertDetailsView extends React.Component<RouteComponentProps>{

    state = initialState;
    componentDidMount() {
        this.setId(this.props.match.params);
        this.loadData();
    }

    setId = (params: any) => {
        this.state.advertId = params.id;
    };

    dispatch(action: Action) {
        this.setState(state => reducer(this.state, action));
    }

    handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setTitle',
            payload: event.target.value
        });
    };

    handleShortDescriptionInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setShortDescription',
            payload: event.target.value
        });
    };

    handleLongDescriptionInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.dispatch({
            type: 'setLongDescription',
            payload: event.target.value
        });
    };

    loadData = () => {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/adverts/' + this.state.advertId, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (this.state.errorMessage === '') {
                    this.setState({
                        advertTitle: data.title,
                        advertDescription: data.longDescription,
                        advertShortDescription: data.shortDescription,
                        ownerId: data.ownerId,
                        ownerName: data.addedBy,
                        advertCategory: data.advertCategory,
                        advertType: data.advertType,
                        applicationExists: data.applicationExists,
                        advertCreatedAt: data.createdAt,
                        canEdit: data.canEdit,
                        canApplicate: data.canApplicate,
                        tags: data.tags
                    })
                }
            })
    };

    editMode() {
        this.dispatch({
            type: 'setEditMode',
            payload: true
        });
    };

    submitChanges() {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/adverts/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            body: JSON.stringify({
                id: this.state.advertId,
                title: this.state.advertTitle,
                shortDescription: this.state.advertShortDescription,
                longDescription: this.state.advertDescription,
                category: this.state.advertCategory
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/adverts/update', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                                },
                                body: JSON.stringify({
                                    id: this.state.advertId,
                                    title: this.state.advertTitle,
                                    shortDescription: this.state.advertShortDescription,
                                    longDescription: this.state.advertDescription,
                                    category: this.state.advertCategory
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
                        advertTitle: data.title,
                        advertShortDescription: data.shortDescription,
                        advertDescription: data.longDescription
                    })
                }
            });

        this.dispatch({
            type: 'setEditMode',
            payload: false
        });
    }


    applicate() {
        if (localStorage.getItem('access_token') === '') {
            window.location.reload();
            window.location.replace("/login");
        }
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/applications/save/' + this.state.advertId, {
            method: 'POST',
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/applications/save' + this.state.advertId, {
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
            });
        if (localStorage.getItem('access_token') !== '') {
            this.dispatch({
                type: 'setCanApplicate',
                payload: false
            });

            this.dispatch({
                type: 'setApplicationExists',
                payload: true
            });
        }
    };

    ownerDetails = () => {
        if (localStorage.getItem('access_token') === '') {
            this.props.history.push('/login');
        }
        else if (this.state.advertType === 'INDIVIDUAL') {
            this.props.history.push('/user/' + this.state.ownerId);
        }
        else if (this.state.advertType === 'COMPANY') {
            this.props.history.push('/company/' + this.state.ownerId);
        }
    };

    render() {
        return (

            <React.Fragment>
                <NavBar />

                <body className="advert-details-body">
                    <div className="advert-detail-data" >
                        <div className="advert-detail-title">{i18n.t('advertDetail.advertDetailPageTitle')}</div>

                        <div className="application-advert">
                            {this.state.canApplicate && !this.state.applicationExists && <button className="detail-button" onClick={this.applicate.bind(this)} >{i18n.t('advertDetail.applicate')}</button>}
                            {this.state.canEdit && !this.state.editMode && <button className="detail-button" onClick={this.editMode.bind(this)} >{i18n.t('advertDetail.edit')}</button>}
                            {this.state.editMode && <button className="detail-button" onClick={this.submitChanges.bind(this)}  >{i18n.t('advertDetail.save')}</button>}
                            {this.state.applicationExists && <button className="application-button" >{i18n.t('advertDetail.applicated')}</button>}

                        </div>
                        <div className="advert-data">
                            <div className="basic-data">
                                {!this.state.editMode &&
                                    <div>
                                        <div className="detail-name-label">{i18n.t('advertDetail.advertDataTitle')}</div>
                                        <label className="detail-label">{i18n.t('advertDetail.title')}</label>
                                        <div className="detail-input">{this.state.advertTitle}</div>
                                        {this.state.canEdit &&
                                            <div>
                                                <label className="detail-label">{i18n.t('advertDetail.shortDescription')}</label>
                                                <div className="detail-input">{this.state.advertShortDescription}</div>
                                            </div>
                                        }
                                        <label className="detail-label">{i18n.t('advertDetail.description')}</label>
                                        <div className="detail-input">{this.state.advertDescription}</div>
                                        <label className="detail-label">{i18n.t('advertDetail.category')}</label>
                                        <div className="detail-input">{i18n.t('categories.' + this.state.advertCategory)}</div>
                                        <label className="detail-label">{i18n.t('advertDetail.createdAt')}</label>
                                        <div className="detail-input">{this.state.advertCreatedAt}</div>
                                    </div>
                                }
                                {this.state.editMode &&
                                    <div>
                                        <div className="detail-name-label">{i18n.t('advertDetail.advertDataTitle')}</div>
                                        <label className="detail-label" >{i18n.t('advertDetail.title')}</label>
                                        <input className="detail-input-edit" type="text" defaultValue={this.state.advertTitle} onChange={this.handleTitleInput} />
                                        <label className="detail-label" >{i18n.t('advertDetail.shortDescription')}</label>
                                        <input className="detail-input-edit" type="text" defaultValue={this.state.advertShortDescription} onChange={this.handleShortDescriptionInput} />
                                        <label className="detail-label">{i18n.t('advertDetail.description')}</label>
                                        <textarea rows={10} className="detail-input-edit" defaultValue={this.state.advertDescription} onChange={this.handleLongDescriptionInput} />
                                        <label className="detail-label">{i18n.t('advertDetail.category')}</label>
                                        <div className="detail-input">{i18n.t('categories.' + this.state.advertCategory)}</div>
                                        <label className="detail-label">{i18n.t('advertDetail.createdAt')}</label>
                                        <div className="detail-input">{this.state.advertCreatedAt}</div>
                                    </div>
                                }

                            </div>

                            <div className="owner-data">
                                <div className="detail-name-label">{i18n.t('advertDetail.ownerDataTitle')}</div>
                                <img src={advertOwnerImage} className="owner-image" alt="Owner Image" onClick={this.ownerDetails.bind(this)} />
                                <label className="detail-label">{i18n.t('advertDetail.ownerName')}</label>
                                <div className="detail-input">{this.state.ownerName}</div>
                                {this.state.tags.length > 0 && <div>
                                    <div className="detail-name-label">{i18n.t('advertDetail.tags')}</div>
                                    <div className ="tags">{this.state.tags.map(tag => <div className = "tag">{tag.name} </div>)}</div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>

                </body>
            </React.Fragment >

        );
    }


}

export default withRouter(AdvertDetailsView)