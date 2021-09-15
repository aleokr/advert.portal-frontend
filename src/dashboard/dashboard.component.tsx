import { Component } from "react";
import NavBar from "../navigation/navBar.component"
import AdvertListView from "../advert/advertPage.component"

class Dashboard extends Component {

    render() {
        return (
            <div>
                <NavBar />
                <AdvertListView />
            </div>
        );
    }
}
export default Dashboard;