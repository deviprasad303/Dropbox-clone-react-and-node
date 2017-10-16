import React from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';

import { history } from '../helpers/index';
import { alertActions } from '../actions/alert.actions';
import { PrivateRoute } from '../components/index';
import { HomePage} from '../HomePage/index';
import { LoginPage } from '../LoginPage/index';
import { RegisterPage } from '../RegisterPage/index';

class App extends React.Component {
    constructor(props) {
        super(props);

        // this line is required to work on plunker because the app preview runs on a subfolder url
        history.push('/');

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
 //       const basePath = '/' + location.pathname.split('/')[1];
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path='/' component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };