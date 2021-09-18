import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginView from "./login/login.component"
import RegisterView from "./login/register.component"
import Dashboard from "./dashboard/dashboard.component"
import NewAdvertView from "./advert/newAdvert.component"
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
            </Switch>
          </div>
        </div>
      </div></Router>
  );
}

export default withTranslation()(App);
