import { Component } from "react";
import '../css/form.css'
import NavBar from "../navigation/navBar.component"
import NewAdvertForm from "./newAdvertForm.component";

class NewAdvertView extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <NewAdvertForm />
            </div>
        );
    }
}

export default NewAdvertView;


