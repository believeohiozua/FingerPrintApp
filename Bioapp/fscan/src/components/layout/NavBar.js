import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export class NavBar extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        authmsgchecker: PropTypes.object,
    };
    render() {
        const { auth } = this.props
        const { authmsgchecker } = this.props
        return (
            <div className="pt-3">
                {auth.token !== undefined && auth.token !== null ?
                    <div className="container">
                        {authmsgchecker.detail == "Invalid token." ?
                            <Link onClick={this.props.logout} to="/bio/login"
                                className="btn-outline-primary btn-xs">
                                <small className="">LOGIN</small>
                            </Link>
                            :
                            <div className="col-md-5 h6 dropdown">
                                <span>&#8942;</span> Menu
                        <div className="dropdown-content py-2 px-3 h6">
                                    <Link to="/"
                                        className="btn-outline-info btn-xs">
                                        <small className="">HOME</small></Link>
                                    <Link to="/bio/register"
                                        className="btn-outline-info btn-xs">
                                        <small className="">REGISTRATION</small></Link>
                                    <Link to="/bio/listview"
                                        className="btn-outline-info btn-xs">
                                        <small className="">LIST VIEW</small></Link>
                                    <Link to="/bio/verification"
                                        className="btn-outline-info btn-xs">
                                        <small className="">VERIFICATION</small></Link>
                                    <Link onClick={this.props.logout} to="/"
                                        className="btn-outline-danger btn-xs">
                                        <small className="">LOGOUT</small></Link>
                                </div>
                            </div>
                        }
                    </div>
                    : ""}


            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.authReducer,
    authmsgchecker: state.errors.msg,
});

export default connect(mapStateToProps, { logout })(NavBar);
