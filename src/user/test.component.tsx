import { Component } from "react";
export default class Test extends Component {
    
  
    componentDidMount() {
      console.log(process.env.REACT_APP_BACKEND_BASE_URL + '/user/getUser');
      fetch(process.env.REACT_APP_BACKEND_BASE_URL + '/user/getUser')
        .then(response => response.json())
        .then((data) => console.log(data));
    }
  
    render() {
      return (
        <div className="table">
          
        </div>
  
      );
  
    }
  }