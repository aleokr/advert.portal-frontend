import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import NavBar from "../navigation/navBar.component";
import UserView from "../settings/user.settings.component"
import "../css/companyDetails.component.css"


class UserDeatilView extends React.Component<RouteComponentProps>{
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="company-view">
                    <UserView ownData={false} id={(this.props.match.params as any)?.id} />
                </div>
            </React.Fragment>
        );
    }


}

export default withRouter(UserDeatilView);