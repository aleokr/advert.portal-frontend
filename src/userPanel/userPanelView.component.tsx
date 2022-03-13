import React from "react";
import { RouteComponentProps } from "react-router-dom";
import '../css/form.css'
import NavBar from "../navigation/navBar.component"
import UserPanel from "./userPanel.component";

class UserPanelView extends React.Component<RouteComponentProps> {
    render() {
        return (
            <div>
                <NavBar />
                <UserPanel {...this.props} />
            </div>
        );
    }
}

export default UserPanelView;