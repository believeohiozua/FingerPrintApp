import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getData } from '../../actions/RegcrudAction';
import SearchBar from "./SearchBar"




export class ListView extends Component {


    // static propTypes = {
    //     list_reg_data: PropTypes.array.isRequired,

    // };

    loadNextData = () => {
        const { next } = this.props
        if (next !== null || next !== undefined) {
            this.props.getData(next);
        }
    }

    loadPreviousData = () => {
        const { previous } = this.props
        console.log(previous)
        if (previous !== null || previous !== undefined) {
            this.props.getData(previous);
        }
    }

    componentDidMount() {
        this.props.getData();
    }
    render() {
        const next = this.props.next
        const previous = this.props.previous
        const buikData = this.props.list_reg_data
        return (
            <Fragment>
                <div>
                    <h3 className="text-center h1">Entry List</h3>
                </div>
                <div className="container py-2">
                    <div className="row">
                        <div className="col-md-10">
                            <SearchBar />
                            <hr />
                        </div>
                        {buikData.length > 0 ? buikData.map((regdata) => {
                            return (
                                <div className="col-md-3  py-2">
                                    <div className="text-center shadow">
                                        <img src={regdata.passport} className="img-thumbnail img-fluid rounded" alt="Passport" height="190" width="170" />
                                        <div className="h5 text-center">
                                            <strong className="pb-2">
                                                <Link maintainScrollPosition={false}
                                                    to={{
                                                        pathname: `/detail/${regdata.pk}`,
                                                        state: { fromDashboard: false }
                                                    }}>
                                                    <span className="h5 text-secondary">
                                                        {regdata.first_name}  {regdata.last_name}
                                                    </span>
                                                </Link>
                                            </strong>
                                            <br />
                                            <sup className="small-font">
                                                <small>-{regdata.pk}-|    Entry Date: {regdata.date_of_entry}</small>
                                            </sup>
                                        </div>

                                    </div>
                                </div>
                            )
                        }) :
                            <div>
                                <p> "NO AVALIBLE DATA TO DISPLAY"</p>
                            </div>
                        }

                        <div className="col-md-12">
                            <div className="text-right align-items-center float-right">
                                {next !== null ?
                                    <button onClick={this.loadNextData} className="btn btn-outline-primary btn-sm">
                                        Next</button> : ''}
                            </div>
                            <div className="text-center align-items-center float-left">
                                {previous !== null ?
                                    <button onClick={this.loadPreviousData} className="btn btn-outline-primary  btn-sm">
                                        Previous</button> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    list_reg_data: state.regdata_reducer.regdata,
    next: state.regdata_reducer.next,
    previous: state.regdata_reducer.previous,
});
export default connect(mapStateToProps, { getData })(ListView);
