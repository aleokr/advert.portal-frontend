import i18n from "../messages/i18n"
import React from "react";
import NavBar from "../navigation/navBar.component"
import UserView from "./user.settings.component"
import CompanyView from "./company.settings.component"
import "../css/settings.component.css"

class SettingsView  extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <body className="settingsListBody">
                    <div className="settingsTabs">
                        <div className="tab-2">
                            <label className="settings-label" htmlFor="tab2-1">{i18n.t('settings.userTab')}</label>
                            <input id="tab2-1" name="tabs-two" type="radio" checked />
                            <UserView ownData = {true}/>
                        </div>
                        {localStorage.getItem('user_type') === 'COMPANY_ADMIN' && localStorage.getItem('company_id') !== null &&
                            <div className="tab-2">
                                <div className="last">
                                    <label className="settings-label" htmlFor="tab2-2">{i18n.t('settings.companyTab')}</label>
                                    <input id="tab2-2" name="tabs-two" type="radio" />
                                    <CompanyView ownCompany = {true}/>
                                </div>
                            </div>
                        }
                    </div>
                </body>
            </React.Fragment>
        );
    }


}

export default SettingsView;