import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendUploadSample, getSampleResults } from '../../actions/verifyActions';

import ScriptTag from 'react-script-tag';
class ScanForm extends Component {
    constructor(props) {
        super(props)
        this.sendFingerPrint = this.sendFingerPrint.bind(this)
        this.handleCapture = this.handleCapture.bind(this)
        this.state = {
            fingerprint: null
        }
    }
    static propTypes = {
        sendUploadSample: PropTypes.func.isRequired,
        getSampleResults: PropTypes.func.isRequired,
    };

    handleCapture() {
        var img_fetch = document.getElementById('image')
        if (img_fetch !== null || img_fetch !== undefined) {
            var fgp = document.getElementById('fingerprint')
            fgp.value = img_fetch.src
            this.setState({
                fingerprint: img_fetch.src
            })
            var x = document.getElementById("fgpstatus");
            x.innerHTML = "send sample";
        }

    }

    sendFingerPrint(event) {
        event.preventDefault()
        this.handleCapture()
        let data = this.state
        console.log(data)
        this.props.sendUploadSample(data)
    }

    render() {
        const { matchfound } = this.props
        console.log('matchfound', matchfound)
        if (matchfound === undefined && this.state !== null) {
            this.props.sendUploadSample(this.state)
        }

        return (

            <div className="shadow text-center border border-info" id="scan-sec">
                <form onSubmit={this.sendFingerPrint}>
                    <fieldset className="">
                        <p className="font-weight-bold text-left ml-5 pt-2">Verify By FingerPrint Scan</p>

                        <div className="form-group ">
                            <label>
                                <p className="h6 font-weight-bold">
                                </p>
                                <center id="off-wen-reg_is-on">
                                    <small id='fgpstatus' className=""></small>
                                </center>
                                <center id="fgpsec">

                                    <div id="content-capture">
                                        <span id="spinner"></span>
                                        <img id="fgp_img" src={'../../../static/img/fingerprint.png'} alt="fingerprint" height="80" width="80" />

                                        <div id="imagediv"></div>

                                        <div className="py-2" id="fingersample"> </div>
                                    </div>

                                    <div id="startcap" className="d-block">
                                        <button type="button" id="startcapture" className="btn-success btn-xs">
                                            Start FingerPrint Capture
                                    </button>
                                    </div>

                                    <div id="capfgp" className="d-none">
                                        <i className="spinner-border "></i> <br />
                                        <button type="button" id="capturefgp" className="btn-warning btn-xs text-white">
                                            click Here to Capture
                                    </button>
                                    </div>

                                    <div id="endcap" className="d-none">
                                        <button type="button" id="stopcapture" className="btn-danger btn-xs">
                                            End Capture
                                    </button>
                                    </div>
                                </center>

                                <input type="hidden"
                                    name="fingerprint"
                                    id="fingerprint"
                                    onChange={this.handleInputChange} />
                            </label>
                            <div id='fpvrfbtn' className="d-none">
                                <button type="submit" className="btn btn-success btn-lg px-5"> Verify </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <ScriptTag isHydrating={true} type="text/javascript" src="" />
            </div>
        );
    }
}
// window.onload = function () {
//     var sp = document.getElementById('fgp_img');
//     if (!sp.complete && sp.src !== null) {
//         document.getElementById("spinner").className = "spinner-border text-success text-center mx-auto";
//     } else {
//         document.getElementById("spinner").className = "d-none";
//     };

// };
const mapStateToProps = (state) => ({
    matchfound: state.verifyReducers.matchfound,
});
export default connect(mapStateToProps, { sendUploadSample, getSampleResults })(ScanForm);

