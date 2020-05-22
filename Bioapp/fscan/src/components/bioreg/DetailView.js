import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDataDetail, deleteData } from '../../actions/RegcrudAction';
import RegForm from './RegForm'


class DetailView extends Component {
    state = {
        regdata: undefined,
        doneLoading: false
    }
    toggleDeleteBtnOn = () => {
        document.getElementById('detail_dialog_sec').className = 'col-md-12 d-block'
    }
    toggleDeleteBtnOff = () => {
        document.getElementById('detail_dialog_sec').className = 'd-none'
    }
    toggleUpdateBtnOn = () => {
        document.getElementById('reg_form_sec').className = 'd-block'
        document.getElementById('detail_sec').className = 'd-none'
    }
    toggleUpdateBtnOff = () => {
        document.getElementById('reg_form_sec').className = 'd-none'
        document.getElementById('detail_sec').className = 'd-block'
    }

    DeleteAction = () => {
        if (this.props.match) {
            const { pk } = this.props.match.params
            this.props.deleteData(pk);
            this.props.history.push(`/bio/listview`);
        }
    }

    componentDidMount() {
        if (this.props.match) {
            const { pk } = this.props.match.params
            this.props.getDataDetail(pk);
        }
        this.setState({
            doneLoading: true
        })
    }
    componentDidUpdate(provProps) {
        if (this.props.detail_reg_data !== provProps.detail_reg_data) {
            this.setState({
                regdata: this.props.detail_reg_data,
                doneLoading: true
            })
        }
    }
    render() {
        const { regdata } = this.state
        const { doneLoading } = this.state
        console.log(regdata)
        return (
            <div className="pb-1 pt-5">
                {(doneLoading === true) ?
                    <div id="detail_sec">
                        {regdata === undefined ? "Data Not Found" :
                            <div className="">
                                <div className="container p-5" id="content_sec">
                                    <div className="row">
                                        <div id="detail_dialog_sec" className="d-none">
                                            <div className="shadow p-3 border border-rounded border-info" id="detail_dialog">
                                                <p className="font-weight-bold py-2 alert alert-info py-2">
                                                    <span>
                                                        Are you sure you want to delete this DATA?
                                                    </span>
                                                </p>
                                                <div className="text-center">
                                                    <button className="font-weight-bold text-success  px-2" onClick={this.toggleDeleteBtnOff} >NO</button>
                                                    &ensp; &ensp; &ensp;
                                                    <button className="font-weight-bold text-danger px-2" onClick={this.DeleteAction}>YES</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row shadow border border-secondary curverme p-2">
                                        <div className="col-md-4 text-center d-block clearfix">
                                            <img src={regdata.passport} className="img-fluid img-thumbnail rounded" alt="passport" />
                                            <main className="row">
                                                <div className="col-6 py-">
                                                    <sub className="">Right Thumb</sub> <br />
                                                    <img src={regdata.right_thumb} alt="" height="80" width="80" className="shadow p-1" />
                                                </div>

                                                <div className="col-6 py-2">
                                                    <sub className="">Right Index</sub> <br />
                                                    <img src={regdata.right_index} alt="" height="80" width="80" className="shadow p-1" />
                                                </div>

                                                <div className="col-6 py-2">
                                                    <sub className="">Left Thumb</sub> <br />
                                                    <img src={regdata.left_thumb} alt="" height="80" width="80" className="shadow p-1" />
                                                </div>

                                                <div className="col-6 py-2">
                                                    <sub className="">Left Index</sub> <br />
                                                    <img src={regdata.left_index} alt="" height="80" width="80" className="shadow p-1" />
                                                </div>
                                            </main>
                                        </div>
                                        <div className="col-md-8 d-block">
                                            <ul className="list-style">
                                                <li>
                                                    <span>  First Name: &ensp;</span>
                                                    <b>
                                                        {regdata.first_name}
                                                    </b>


                                                </li>
                                                <li>
                                                    <span>Last Name: &ensp;</span>
                                                    <b>
                                                        {regdata.last_name}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span className="pr-2">Gender: &ensp; &ensp;   </span>
                                                    <b>
                                                        {regdata.gender}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span className="pr-3">Birthday:  &ensp;</span>
                                                    <b>
                                                        {regdata.date_of_birth}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span> Email: &ensp;  &ensp; &ensp; &ensp;</span>
                                                    <b>
                                                        {regdata.email}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span> Address: &ensp; &ensp; </span>
                                                    <b>
                                                        {regdata.address}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span>Phone No.: &ensp; </span>
                                                    <b>
                                                        {regdata.phone_number}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span> Registered By: &ensp; &ensp; </span>
                                                    <b>
                                                        {regdata.entry_officer}
                                                    </b>
                                                </li>
                                                <li>
                                                    <span>  Entry Date:&ensp; &ensp; </span>
                                                    <b>
                                                        {regdata.date_of_entry}
                                                    </b>
                                                </li>
                                            </ul>
                                            <section className="px-5 mx-5 pt-5">
                                                <button className="btn btn-outline-success btn-rounded btn-block my-4 waves-effect z-depth-0 setactive" onClick={this.toggleUpdateBtnOn}>Update</button>

                                                <button className="btn btn-outline-danger btn-rounded btn-block my-4 waves-effect z-depth-0 setactive" onClick={this.toggleDeleteBtnOn}>Delete</button>
                                            </section>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                    : <p className="text-center font-weight-bold h5 pt-3">Loading Data...</p>
                }
                <div className="d-none" id="reg_form_sec">
                    <RegForm updateBtn={this.toggleUpdateBtnOff} regdata={regdata} />
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => ({
    detail_reg_data: state.regdata_reducer.detail,
});
export default connect(mapStateToProps, { getDataDetail, deleteData })(DetailView);

