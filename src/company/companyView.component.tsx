import "../css/user.component.css"
import companyImage from "../assets/company.png"
import i18n from "../messages/i18n"
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
    ownCompany: boolean;
    editMode: boolean;
    attachment: FormData;
    attachmentName: string;
    image: FormData;
    imageName: string;
    imagePath: string;
    mainFilePath: string;
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
    attachment: new FormData(),
    attachmentName: "",
    image: new FormData(),
    imageName: '',
    imagePath: '',
    mainFilePath: '',
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
                success: true
            };
        case 'setError':
            return {
                ...state,
                success: false,
                errorMessage: action.payload
            };
    }
}

class CompanyView extends React.Component<any> {

    state = initialState;

    dispatch(action: Action) {
        this.setState(state => reducer(this.state, action));
    }

    /* istanbul ignore next */
    componentDidMount() {
        this.setParams(this.props)
        this.loadData();
    }

    /* istanbul ignore next */
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

    /* istanbul ignore next */
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
                if (this.state.imageName !== "") {
                    this.saveFile(this.state.image);
                    this.setState({ imageName: "" });
                }
                if (this.state.attachmentName !== "") {
                    this.saveFile(this.state.attachment);
                    this.setState({ attachmentName: "" });

                }
            });

        this.dispatch({
            type: 'setEditMode',
            payload: false
        });
    }

    /* istanbul ignore next */
    loadData = () => {
        const path = this.state.ownCompany ? '/api/v1/companies/' : '/api/v1/companies/' + this.state.id;

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
                        members: data.members,
                        imagePath: data.imagePath,
                        mainFilePath: data.mainFilePath
                    })
                }
            })
    };

    /* istanbul ignore next */
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

    addAttachment = (e: any): void => {
        let files = e.target.files;
        let formData = new FormData();

        formData.append('file', files[0]);
        formData.append('contentType', 'application/pdf');
        formData.append('type', 'ATTACHMENT');
        formData.append('resourceType', 'COMPANY');
        formData.append('resourceId', this.state.id.toString());
        formData.append('fileName', files[0].name);

        this.setState({ attachmentName: files[0].name });
        this.setState({ attachment: formData });
    }

    addImage = (e: any): void => {
        let files = e.target.files;
        let formData = new FormData();
        formData.append('file', files[0]);
        formData.append('contentType', 'image/png');
        formData.append('type', 'IMAGE');
        formData.append('resourceType', 'COMPANY');
        formData.append('resourceId', this.state.id.toString());
        formData.append('fileName', files[0].name);

        this.setState({ imageName: files[0].name });
        this.setState({ image: formData });
    }

    /* istanbul ignore next */
    saveFile = (body: FormData) => {
        fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/api/v1/files/save', {
            method: 'POST',
            body: body
        });
    }
    render() {
        return (

            <div className="center">
                <div className="profile">
                    <img src={this.state.imagePath !== null && this.state.imagePath !== '' ? this.state.imagePath : companyImage} className="user-image" />
                    {this.state.editMode && <div>
                        <label className="file-label">{i18n.t('user.addAttachment')}</label>
                        <label htmlFor="attachmentPicker" className="file-picker">{i18n.t('user.choose')}</label>
                        <label htmlFor="attachmentPicker" className="file-label">{this.state.attachmentName}</label>
                        <input type="file" id="attachmentPicker" accept="application/pdf" style={{ visibility: "hidden" }}
                            onChange={(e) => e.target.files !== null && e.target.files !== undefined ? this.addAttachment.bind(this)(e) : ""} />
                    </div>}
                    {this.state.editMode && <div>
                        <label className="file-label">{i18n.t('user.addImage')}</label>
                        <label htmlFor="imagePicker" className="file-picker">{i18n.t('user.choose')}</label>
                        <label htmlFor="imagePicker" className="file-label">{this.state.imageName}</label>
                        <input type="file" id="imagePicker" accept="image/png" style={{ visibility: "hidden" }}
                            onChange={(e) => e.target.files !== null && e.target.files !== undefined ? this.addImage.bind(this)(e) : ""} />
                    </div>}
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
                    {!this.state.editMode && this.state.mainFilePath !== null && this.state.mainFilePath !== '' &&
                        <div>
                            <label className="user-label" >{i18n.t('company.files')}</label>
                            <a className="main-file" target="_blank" rel="noopener noreferrer" href={this.state.mainFilePath} >{i18n.t('company.mainFile')}</a>
                        </div>}
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

export { initialState, reducer };
export default CompanyView;