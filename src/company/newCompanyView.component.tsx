import React from "react";
import { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import '../css/form.css'
import NavBar from "../navigation/navBar.component";
import NewCompanyForm from "./newCompanyForm.component";

const access: boolean = localStorage.getItem('access_token') !== '' && (localStorage.getItem('user_type') === 'COMPANY_ADMIN' && localStorage.getItem('company_id') === null);

class NewCompanyView extends React.Component<RouteComponentProps>  {
    render() {
        return (
            <div>
                <NavBar />
                {access && <NewCompanyForm {...this.props} />}
            </div>
        );
    }
}

export default NewCompanyView;