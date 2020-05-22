import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from './layout/Alerts';

import store from '../store';
import Home from './layout/Home';
import NavBar from './layout/NavBar';
import RegForm from './bioreg/RegForm';
import ListView from './bioreg/ListView';
import DetailView from './bioreg/DetailView'
import Verification from './verifications/Verification';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';
// Alert Options
const alertOptions = {
    timeout: 3000,
    position: 'top center',
};



class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <NavBar />
                            <Alerts />
                            <div className="container">
                                <Switch>
                                    <PrivateRoute exact path='/' component={Home} />
                                    <Route exact path="/bio/register" component={RegForm} />
                                    <Route exact path="/bio/listview" component={ListView} />
                                    <Route exact path="/detail/:pk" component={DetailView} />
                                    <Route exact path="/bio/verification" component={Verification} />
                                    <Route exact path="/bio/signup" component={Register} />
                                    <Route exact path="/bio/login" component={Login} />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));