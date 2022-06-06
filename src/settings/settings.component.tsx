import i18n from "../messages/i18n"
import React from "react";
import NavBar from "../navigation/navBar.component"
import UserView from "../user/userView.component"
import CompanyView from "../company/companyView.component"
import "../css/settings.component.css"

const access: boolean = localStorage.getItem('access_token') !== '' && (!(localStorage.getItem('user_type') === 'COMPANY_ADMIN' && localStorage.getItem('company_id') === null) &&
    !(localStorage.getItem('user_type') === 'COMPANY_USER' && localStorage.getItem('company_id') === null));
class SettingsView extends React.Component {

    render() {
        return (
            <React.Fragment>
                <NavBar />
                {access &&
                    <body className="settings-list-body">
                        <div className="settings-tabs">
                            <div className="tab-2">
                                <label className="settings-label" htmlFor="tab2-1">{i18n.t('settings.userTab')}</label>
                                <input id="tab2-1" name="tabs-two" type="radio" defaultChecked />
                                <UserView ownData={true} />
                            </div>
                            {localStorage.getItem('user_type') === 'COMPANY_ADMIN' && localStorage.getItem('company_id') !== null &&
                                <div className="tab-2">
                                    <div className="last">
                                        <label className="settings-label" htmlFor="tab2-2">{i18n.t('settings.companyTab')}</label>
                                        <input id="tab2-2" name="tabs-two" type="radio" />
                                        <CompanyView ownCompany={true} />
                                    </div>
                                </div>
                            }
                        </div>
                    </body>}
            </React.Fragment>
        );
    }
}

export default SettingsView;