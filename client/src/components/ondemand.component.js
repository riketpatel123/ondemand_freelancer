import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink ,Switch} from 'react-router-dom';

import OndemandList from "./ondemand-list.component";
import OndemandNewRequest from "./ondemand-new-request.component";

/** Parent Component to Handle ondemand request feature */
export default class OnDemand extends Component {
    render() {
        return (
            <div className="container">
                <h6>Freelancer  > On Demand </h6>
                <Router>
                    <nav class="nav bg-light">
                        <NavLink class="nav-link" exact to="/ondemand/home">Create New Request</NavLink>
                        <NavLink class="nav-link" to="/ondemand/mylist">MyList</NavLink>
                    </nav>
                    <Switch>
                        <Route exact path="/ondemand/home" component={OndemandNewRequest} />
                        <Route path="/ondemand/mylist" component={OndemandList} />
                    </Switch>

                </Router>
            </div >
        );
    }
}