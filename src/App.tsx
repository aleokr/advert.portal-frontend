import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginView from "./login/login.component";
import RegisterView from "./login/register.component";
import Dashboard from "./dashboard/dashboard.component";
import NewAdvertView from "./advert/newAdvertView.component";
import NewCompanyView from "./company/newCompanyView.component";
import UserPanelView from "./userPanel/userPanel.component"
import SettingsView from "./settings/settings.component"
import AdvertDetailsView from "./advert/advertDetailsView.component"
import CompanyDetailView from "./company/companyDetails.component"
import UserDetailView from "./user/userDetails.component"
import NewTagView from "./tag/newTagView.component"
import { withTranslation } from "react-i18next";

function App() {
  require('dotenv').config();
  return (
    <Router>
      <div className="App">
        <div className="outer">
          <div className="inner">
            <Switch>
              <Route exact path='/login' component={LoginView} />
              <Route exact path='/register' component={RegisterView} />
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/addAdvert' component={NewAdvertView} />
              <Route exact path='/details/:id' component={AdvertDetailsView} />
              <Route exact path='/addCompany' component={NewCompanyView} />
              <Route exact path='/userPanel' component={UserPanelView} />
              <Route exact path='/settings' component={SettingsView} />
              <Route exact path='/company/:id' component={CompanyDetailView} />
              <Route exact path='/user/:id' component={UserDetailView} />
              <Route exact path='/addTag' component={NewTagView} />
            </Switch>
          </div>
        </div>
      </div></Router>
  );
}

export default withTranslation()(App);
