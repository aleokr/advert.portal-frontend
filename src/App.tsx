import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginView from "./login/login.component"
import RegisterView from "./login/register.component"
import './App.css';
import { withTranslation } from "react-i18next";


function App() {
  require('dotenv').config();
  return (<Router>
    <div className="App">
      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/login' component={LoginView} />
            <Route exact path='/register' component={RegisterView} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default withTranslation()(App);
