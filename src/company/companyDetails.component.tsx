import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import NavBar from "../navigation/navBar.component";
import CompanyView from "./companyView.component"
import "../css/companyDetails.component.css"


const token: boolean = localStorage.getItem('access_token') !== '';

class CompanyDeatilView extends React.Component<RouteComponentProps>{
    render() {
        return (
            <React.Fragment>
                <NavBar />
                {token &&
                    <div className="company-view">
                        <CompanyView ownCompany={false} id={(this.props.match.params as any)?.id} />
                    </div>}
            </React.Fragment>
        );
    }


}

export default withRouter(CompanyDeatilView);