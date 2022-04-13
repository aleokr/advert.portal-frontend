import { Component } from "react";
import '../css/form.css'
import NavBar from "../navigation/navBar.component";
import NewTagForm from "./newTagForm.component";

const access: boolean = localStorage.getItem('access_token') !== '' && (!(localStorage.getItem('user_type') === 'COMPANY_ADMIN' && localStorage.getItem('company_id') === null) &&
    !(localStorage.getItem('user_type') === 'COMPANY_USER' && localStorage.getItem('company_id') === null));
    
class NewTagView extends Component {
    render() {
        return (
            <div>
                <NavBar />
                {
                    access &&  <NewTagForm />
                }
            </div>
        );
    }
}

export default NewTagView;