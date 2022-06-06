import React from "react";
import { RouteComponentProps } from "react-router-dom";
import '../css/form.css'
import NavBar from "../navigation/navBar.component"
import UserPanel from "./userPanel.component";

const access: boolean = localStorage.getItem('access_token') !== '' && (!(localStorage.getItem('user_type') === 'COMPANY_ADMIN' && localStorage.getItem('company_id') === null) && 
                    !(localStorage.getItem('user_type') === 'COMPANY_USER' && localStorage.getItem('company_id') === null));

class UserPanelView extends React.Component<RouteComponentProps> {
    render() {
        return (
            <div>
                <NavBar />
                {access && <UserPanel {...this.props} />}
            </div>
        );
    }
}

export default UserPanelView;