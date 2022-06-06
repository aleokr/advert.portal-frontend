import NavBar from "../navigation/navBar.component"
import AdvertListView from "../advert/advertList.component"
import React from "react";
import { RouteComponentProps } from "react-router-dom";

class Dashboard extends React.Component<RouteComponentProps>  {
    render() {
        return (
            <div>
                <NavBar />
                <AdvertListView {...this.props} />
            </div>
        );
    }
}
export default Dashboard;