import { Component } from "react";
import '../css/form.css'
import NavBar from "../navigation/navBar.component";
import NewTagForm  from "./newTagForm.component";
class NewTagView extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <NewTagForm />
            </div>
        );
    }
}

export default NewTagView;