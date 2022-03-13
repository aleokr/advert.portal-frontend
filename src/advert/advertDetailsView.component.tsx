import React from "react";
import { RouteComponentProps } from "react-router-dom";
import '../css/form.css'
import NavBar from "../navigation/navBar.component"
import AdvertDetails from "./advertDetails.component";

class AdvertDetailsView extends React.Component<RouteComponentProps> {
    render() {
        return (
            <div>
                <NavBar />
                <AdvertDetails {...this.props} />
            </div>
        );
    }
}

export default AdvertDetailsView;

