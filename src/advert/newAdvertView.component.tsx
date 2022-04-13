import { Component } from "react";
import '../css/form.css'
import NavBar from "../navigation/navBar.component"
import NewAdvertForm from "./newAdvertForm.component";

const access: boolean = localStorage.getItem('access_token') !== '' && (!(localStorage.getItem('user_type') === 'COMPANY_ADMIN' && localStorage.getItem('company_id') === null) &&
    !(localStorage.getItem('user_type') === 'COMPANY_USER' && localStorage.getItem('company_id') === null));

class NewAdvertView extends Component {
    render() {
        return (
            <div>
                <NavBar />
                {access && <NewAdvertForm />}
            </div>
        );
    }
}

export default NewAdvertView;


