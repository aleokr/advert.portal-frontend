import './form.css'
import { withTranslation } from "react-i18next";
import { Component } from 'react';
// import Select from 'react-select';

type State = {
    name: string;
    surname: string;
    email: string;
    password: string;
    userType: string;
    companyUser: boolean;
    companyAdmin: boolean;
    companyName: string;
    companyId: number;
    errorMessage?: string;
    success: boolean;
};

let initialState: State = {
    name: '',
    surname: '',
    email: '',
    password: '',
    userType: 'INDIVIDUAL_USER',
    companyUser: false,
    companyAdmin: false,
    companyName: '',
    companyId: 0,
    errorMessage: '',
    success: false
}

type Action = { type: 'setName', payload: string }
    | { type: 'setSurname', payload: string }
    | { type: 'setEmail', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setCompanyUser', payload: boolean }
    | { type: 'setCompanyAdmin', payload: boolean }
    | { type: 'setUserType', payload: string }
    | { type: 'setCompanyName', payload: string }
    | { type: 'setCompanyId', payload: number }
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
        case 'setCompanyUser':
            return {
                ...state,
                companyUser: action.payload
            };
        case 'setCompanyAdmin':
            return {
                ...state,
                companyAdmin: action.payload
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

const userTypes = [
    { value: 'INDIVIDUAL_USER', label: 'Individual User' },
    { value: 'COMPANY_ADMIN', label: 'Company Admin' },
    { value: 'COMPANY_USER', label: 'Company User' }
];

class RegisterView extends Component {
    state = initialState;

    dispatch(action: Action) {
        this.setState(state => reducer(this.state, action));
    }

    handleUserTypeInput(event: React.ChangeEvent<HTMLSelectElement>) {
        this.dispatch({
            type: 'setUserType',
            payload: event.target.value
        });
    };

    render() {
        return (
            <div className="form-box">
                <h2>Advert portal</h2>
                <form>
                    <div className="user-box">
                        <input type="text" required />
                        <label>Name</label>
                    </div>
                    <div className="user-box">
                        <input type="text" required />
                        <label>Surname</label>
                    </div>
                    <div className="user-box">
                        <input type="email" required />
                        <label>Email</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="" required />
                        <label>Password</label>
                    </div>
                    <div className="box">
                        <select onChange={e => this.handleUserTypeInput(e)} value={this.state.userType}>
                            {userTypes.map(type => (
                                <option key={type.label} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    {this.state.companyAdmin &&
                        <div className="user-box">
                            <input type="text" required />
                            <label>Company Name</label>
                        </div>
                    }
                    {this.state.companyUser &&
                        <div className="box">
                            <select>
                                <option>Company 1</option>
                                <option>Company 2</option>
                                <option>Company 3</option>
                            </select>
                        </div>
                    }

                    <a href="button">Submit</a>
                </form>
            </div>

        );
    }


}

export default withTranslation('register')(RegisterView)
