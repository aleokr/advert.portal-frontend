import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Test from "./user/test.component"
import './App.css';

function App() {
  require('dotenv').config();
  return (<Router>
    <div className="App">
      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/test' component={Test} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
