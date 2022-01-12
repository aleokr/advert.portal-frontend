import { Component } from "react";
import Select, { ValueType } from "react-select";
import '../css/form.css'
import i18n from "../messages/i18n"
import logo from '../assets/logo_black.png';
import React from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../navigation/navBar.component"

type State = {
    title: string;
    shortDescription: string;
    longDescription: string;
    category: string;
    categories: string[];
    tags: Tag[];
    attachment: FormData;
    fileName: string;
    selectTagIds: number[];
    errorMessage?: string;
    success: boolean;
};

type File = {
    file: FormData;
    fileName: string;

};
type Tag = {
    value: number;
    label: string;
};

let initialState: State = {
    title: '',
    shortDescription: '',
    longDescription: '',
    category: '',
    categories: [],
    tags: [],
    attachment: new FormData(),
    fileName: "",
    selectTagIds: [],
    errorMessage: '',
    success: false
}

type Action = { type: 'setTitle', payload: string }
    | { type: 'setShortDescription', payload: string }
    | { type: 'setLongDescription', payload: string }
    | { type: 'setCategory', payload: string }
    | { type: 'addSuccess', payload: string }
    | { type: 'addFailed', payload: string }
    | { type: 'setError', payload: string };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setTitle':
            return {
                ...state,
                title: action.payload
            };
        case 'setShortDescription':
            return {
                ...state,
                shortDescription: action.payload
            };
        case 'setLongDescription':
            return {
                ...state,
                longDescription: action.payload
            };
        case 'setCategory':
            return {
                ...state,
                category: action.payload
            };
        case 'addSuccess':
            return {
                ...state,
                errorMessage: '',
                success: true
            };
        case 'addFailed':
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

const token: boolean = localStorage.getItem('access_token') !== '';

class NewAdvertView extends Component {
    state = initialState;

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

    handleAdvertCategoryInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.dispatch({
            type: 'setCategory',
            payload: event.target.value
        });
    }

    handleTagInputChange = (event: ValueType<Tag, true>) => {
        let list: Array<Tag> = event as Array<Tag>;
        let tags: number[] = [];

        list.forEach(element => {
            tags.push(element.value);
        });
        this.setState({ selectTagIds: tags });
    }

    dispatch(action: Action) {
        this.setState(state => reducer(this.state, action));
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/adverts/categories')
            .then(response => response.json())
            .then(data => {
                this.setState({ categories: data });
                this.setState({ category: data[0] })
            });
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/tags/list')
            .then(response => response.json())
            .then(data => {
                this.setState({ tags: data });
            });

    }

    saveFile = () => {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/files/save', {
            method: 'POST',
            body: this.state.attachment
          });
    }

    handleAddNewAdvert = (event: React.FormEvent) => {
        event.preventDefault();
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/adverts/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            },
            body: JSON.stringify({
                title: this.state.title,
                shortDescription: this.state.shortDescription,
                longDescription: this.state.longDescription,
                category: this.state.category,
                tagIds: this.state.selectTagIds
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
                            fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/adverts/save', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                                },
                                body: JSON.stringify({
                                    title: this.state.title,
                                    shortDescription: this.state.shortDescription,
                                    longDescription: this.state.longDescription,
                                    category: this.state.category,
                                    tagIds: this.state.selectTagIds
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
                    this.setState({resourceId : data.id});
                    this.state.attachment.append('resourceId', data.id);
                    this.dispatch({
                        type: 'addSuccess',
                        payload: ''
                    })
                    this.saveFile();
                }
            })
            
    }

    addAttachment = (e: any): void => {
        let files = e.target.files;
        let formData = new FormData();

        formData.append('file', files[0]);
        formData.append('contentType', 'application/pdf');
        formData.append('type', 'ATTACHMENT');
        formData.append('resourceType', 'ADVERT');
        formData.append('fileName', files[0].name);

        this.setState({ fileName: files[0].name });
        this.setState({ attachment: formData });
    }


    render() {
        return (

            <React.Fragment>
                <NavBar />

                {this.state.errorMessage === '' && this.state.success === true &&
                    <Redirect to='/userPanel' />
                }
                {this.state.errorMessage === 'UNAUTHORIZED' &&
                    <Redirect to='/login' />
                }
                {token &&
                    <div className="form-box">
                        <img className="advertBlackLogo" src={logo} alt='logo' />
                        <h2>{i18n.t('newAdvert.addAdvertTitle')}</h2>
                        <form action="./addAdvert" onSubmit={this.handleAddNewAdvert} >
                            <div className="select-box">
                                <label>{i18n.t('newAdvert.category')}</label>
                                <select onChange={e => this.handleAdvertCategoryInput(e)} value={this.state.category}>
                                    {this.state.categories.map(category => (
                                        <option key={category} value={category}>
                                            {i18n.t('categories.' + category)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="select-box">
                                <label>{i18n.t('newAdvert.tags')}</label>
                                <Select className="multi-select"
                                    closeMenuOnSelect={false}
                                    placeholder={i18n.t('newAdvert.select')}
                                    noOptionsMessage={() => i18n.t('newAdvert.noOptions')}
                                    isMulti
                                    onChange={e => this.handleTagInputChange(e)}
                                    options={this.state.tags}
                                />
                            </div>
                            <div className="user-box">
                                <input type="text" maxLength={100} onChange={this.handleTitleInput} required />
                                <label>{i18n.t('newAdvert.title')}</label>
                            </div>
                            <div className="user-box">
                                <input type="text" maxLength={100} onChange={this.handleShortDescriptionInput} required />
                                <label>{i18n.t('newAdvert.shortDescription')}</label>
                            </div>

                            <div className="user-box">
                                <label>{i18n.t('newAdvert.longDescription')}</label>
                                <textarea rows={10} className="advert-area" maxLength={1000} onChange={this.handleLongDescriptionInput} required />
                            </div>

                            <div className="file-box">
                                <div>
                                    <label className="file-label">{i18n.t('newAdvert.attachment')}</label>
                                    <label htmlFor="filePicker" className="file-picker">{i18n.t('newAdvert.choose')}</label>
                                    <label htmlFor="filePicker"  className="file-label"> {this.state.fileName}</label>
                                    <input type="file" id="filePicker" accept="application/pdf" style={{ visibility: "hidden" }}
                                        onChange={(e) => e.target.files != null ? this.addAttachment.bind(this)(e) : ""} />
                                </div>
                            </div>
                            <button className="form-button" type="submit">{i18n.t('newAdvert.addButton')}</button>
                        </form>
                    </div>
                }

            </React.Fragment>
        );
    }


}

export default NewAdvertView;


