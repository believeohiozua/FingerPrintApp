import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import UploadForm from './UploadForm';
import ScanForm from './ScanForm';
import SampleOne from './SampleOne';
import SampleTwo from './SampleTwo';
import SampleThree from './SampleThree';




class Verification extends Component {
    constructor(props) {
        super(props)
    }

    clearSpace = () => {
        document.getElementById('clr').className = "d-none"
        document.getElementById('load').className = "col-md-6 d-block"
    }

    showRelatedMatches = () => {
        document.getElementById('related_samples').className = 'row text-center'
        document.getElementById('off-button').className = 'd-none'
        document.getElementById("clearall").className = "text-center"
    }

    verificationStatueOn = () => {
        document.getElementById('vstatus').innerHTML = 'Checking Please Wait...';
        document.getElementById('vstatus-sec').className = "d-block"
    }
    verificationStatueOff = () => { document.getElementById('vstatus-sec').className = "d-none" }
    ResetSpace = () => { document.getElementById('clr').className = "d-none" }

    componentDidUpdate(provProps) {
        if (this.props.matchfound !== provProps.detail_reg_data) {
            document.getElementById('vstatus-sec').className = "d-none"
            document.getElementById('clr').className = "d-block"
        }
    }

    render() {
        const { matchfound } = this.props
        const { sampleone } = this.props
        const { sampletwo } = this.props
        const { samplethree } = this.props

        return (
            <Fragment>
                <div className="">
                    <div className="">
                        <h3 className="text-center h1">Verification</h3>
                        <p className="text-center h3">Biometric Verification</p>
                        <div className="row">
                            <div className="col-md-5 m-auto">
                                <ScanForm />
                                <UploadForm
                                    statusfucOn={this.verificationStatueOn}
                                    statusfucOff={this.verificationStatueOff}
                                    ResetSpace={this.ResetSpace}
                                    openSpace={this.openSpace}
                                />
                            </div>

                            <div id="load" className="col-md-6 m-auto">
                                <div className="font-weight-bold text-center h5">
                                    <div id="vstatus-sec" className="m-5 d-none">
                                        <p id="vstatus"></p>
                                        <span className="spinner-grow"> &ensp;</span>
                                    </div>
                                </div>
                                <div id="clr">
                                    {matchfound === false && matchfound !== null && matchfound !== undefined ?
                                        <p className="font-weight-bold text-center h5 py-2">
                                            <span>No Match Found</span>
                                        </p>
                                        :
                                        ""
                                    }
                                    {matchfound === true ?
                                        <div className="row">
                                            <div className="font-weight-bold text-center h5 col-md-12">
                                                <p>Match Found</p>
                                            </div>
                                            <div className="col-md-12">
                                                <SampleOne getSampleOne={sampleone} />
                                            </div>
                                            <div className="col-md-12 text-center">
                                                <div id="related_samples" className="d-none">
                                                    <div className="col-md-6">
                                                        <SampleTwo getsample2={sampletwo} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <SampleThree getsample3={samplethree} />
                                                    </div>
                                                </div>
                                                <div className="pb-3 mt-2 text-center col-md-12">
                                                    <button className="btn btn-outline-warning btn-sm" id="off-button" onClick={this.showRelatedMatches}>Related Match</button>
                                                </div>
                                                <div className="d-none" id="clearall">
                                                    <button className="text-center btn btn-danger btn-sm" onClick={this.clearSpace}> Clear </button>
                                                </div>
                                            </div>
                                        </div>
                                        : ""}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    matchfound: state.verifyReducers.matchfound,
    sampleone: state.verifyReducers.sample1,
    sampletwo: state.verifyReducers.sample2,
    samplethree: state.verifyReducers.sample3,
});
export default connect(mapStateToProps, null)(Verification);

