import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import NavBar from "../navigation/navBar.component";
import CompanyView from "./companyView.component"
import "../css/companyDetails.component.css"


const access: boolean = localStorage.getItem('access_token') !== '' && (!(localStorage.getItem('user_type') === 'COMPANY_ADMIN' && localStorage.getItem('company_id') === null) && 
                    !(localStorage.getItem('user_type') === 'COMPANY_USER' && localStorage.getItem('company_id') === null));

class CompanyDeatilView extends React.Component<RouteComponentProps>{
    render() {
        return (
            <React.Fragment>
                <NavBar />
                {access &&
                    <div className="company-view">
                        <CompanyView ownCompany={false} id={(this.props.match.params as any)?.id} />
                    </div>}
            </React.Fragment>
        );
    }


}

export default withRouter(CompanyDeatilView);