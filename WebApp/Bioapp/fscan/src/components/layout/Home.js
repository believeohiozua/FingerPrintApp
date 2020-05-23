import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Login from "../accounts/Login"

export class Home extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        authmsgchecker: PropTypes.object.isRequired,
    };


    render() {
        const { auth } = this.props
        const { authmsgchecker } = this.props
        console.log('auth', auth)
        return (
            <Fragment>
                {auth.token === null || auth.token === undefined || authmsgchecker.msg.detail == "Invalid token." ? <Login /> :
                    <div>
                        <p className="text-center font-weight-bold h3 py-5">BIO REGISTRATION AND VERIFICATION</p>
                        <div className="row">
                            <div className="col-md-6 text-center py-4 bg-white shadow border border-success">
                                <div className="shadow mx-auto py-5 bg-success" id="home-sec">
                                    <button className="text-white font-weight-bold btn btn-light btn-rounded btn-xs">
                                        <Link to={"/register"} className="text-success">REGISTRATION</Link>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6 text-center py-4 bg-white shadow border border-primary">
                                <div className="shadow mx-auto py-5 bg-primary" id="home-sec">
                                    <button className="text-white font-weight-bold btn btn-light btn-rounded btn-xs">
                                        <Link to={"/listview"} className="text-primary">LIST VIEW</Link>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6 text-center py-4 bg-white shadow border border-warning">
                                <div className="shadow mx-auto py-5 bg-warning" id="home-sec">
                                    <button className="text-white font-weight-bold btn btn-light btn-rounded btn-xs">
                                        <Link to={"/verification"} className="text-warning">VERIFICATION</Link>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6 text-center py-4 shadow border-danger border border-danger">
                                <div className="shadow mx-auto py-5 bg-danger" id="home-sec">
                                    <button className="text-white font-weight-bold btn btn-light btn-rounded btn-xs">
                                        <Link onClick={this.props.logout} to={"/login"} className="text-danger"> LOGOUT</Link>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.authReducer,
    authmsgchecker: state.errors,
});

export default connect(mapStateToProps, { logout })(Home);

