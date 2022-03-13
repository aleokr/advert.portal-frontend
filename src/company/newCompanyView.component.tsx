import { Component } from "react";
import '../css/form.css'
import NavBar from "../navigation/navBar.component";
import NewCompanyForm from "./newCompanyForm.component";


class NewCompanyView extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <NewCompanyForm />
            </div>
        );
    }
}

export default NewCompanyView;