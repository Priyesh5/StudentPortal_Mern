import React, { Component } from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import SignInComponent from './SignInComponent';
import SignUpComponent from './SignUp';
import StudentServiceComponent from './StudentServiceComponent';



class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (           
              
            <Switch>
                <Route exact path="/login" component={SignInComponent}></Route>
                <Route exact path="/register" component={SignUpComponent}></Route>
                <Route exact path="/portal/:param" component={StudentServiceComponent}></Route>
                <Redirect to="/login"/>
            </Switch>
          );
    }
}
 
export default MainComponent;