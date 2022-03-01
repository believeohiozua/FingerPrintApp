import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Register, updateRegister } from '../../actions/RegcrudAction';
import { Redirect } from 'react-router-dom';
import { createMessage } from '../../actions/actnmessages';
import { Link } from 'react-router-dom';


export class RegForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            address: "",
            gender: "",
            date_of_birth: "",
            phone_number: "",
            passport: "",
            right_thumb: "",
            right_index: "",
            left_thumb: "",
            left_index: "",
            errors: {},

        }
    }

    static propTypes = {
        Register: PropTypes.func.isRequired,
        updateRegister: PropTypes.func.isRequired,

    };
    defaultState = () => {
        this.setState({
            first_name: "",
            last_name: "",
            email: "",
            address: "",
            gender: "",
            date_of_birth: "",
            phone_number: "",
            passport: "",
            right_thumb: "",
            right_index: "",
            left_thumb: "",
            left_index: "",
        })
    };


    clearForm = event => {
        if (event) {
            event.preventDefault()
        }
        const { regdata } = this.props
        console.log('formData', regdata)
        this.dataCreateForm.reset()
        this.defaultState()
        document.getElementById("canvas").className = 'd-none';
        stopStreaming();
    };


    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const formData = this.state;
        let imgChecker = document.getElementById('passport')
        let gender = document.getElementById('gender')
        let right_thumb = document.getElementById('right_thumb')
        let right_index = document.getElementById('right_index')
        let left_thumb = document.getElementById('left_thumb')
        let left_index = document.getElementById('left_index')
        if (imgChecker.value) {
            formData['passport'] = imgChecker.value
        } else {
            alert('This Form is Submitted Without Imgae Caption!')
        };
        if (gender.value) {
            formData['gender'] = gender.value
        }
        if (right_thumb.value && right_index.value && left_thumb.value && left_index.value) {
            formData['right_thumb'] = right_thumb.value
            formData['right_index'] = right_index.value
            formData['left_thumb'] = left_thumb.value
            formData['left_index'] = left_index.value
        } else {
            document.getElementById('regfgpstatus').innerHTML = "Finger Print Scans Erro!";
        }
        const { regdata } = this.props
        console.log('formData', regdata, formData)
        if (regdata !== undefined) {
            this.props.updateRegister(regdata.pk, formData);
            this.props.updateBtn();
            this.props.createMessage({ generalSuccessMessage: 'Update Successful' });
        } else {
            this.props.Register(formData);
            this.props.createMessage({ generalSuccessMessage: 'Registration Successful' });
            document.getElementById('reg_dialog_sec').className = "d-block"
        }
    };


    continueReg = () => {
        this.clearForm();
        document.getElementById('reg_dialog_sec').className = "d-none"

    }


    componentDidUpdate(provProps) {
        if (this.props.regdata !== provProps.regdata) {
            const { regdata } = this.props
            if (regdata !== undefined && regdata !== null) {
                this.setState({
                    first_name: regdata.first_name,
                    last_name: regdata.last_name,
                    email: regdata.email,
                    address: regdata.address,
                    gender: regdata.gender,
                    date_of_birth: regdata.date_of_birth,
                    phone_number: regdata.phone_number,
                    passport: regdata.passport,
                    right_thumb: regdata.right_thumb,
                    right_index: regdata.right_index,
                    left_thumb: regdata.left_thumb,
                    left_index: regdata.left_index,
                })
            } else {
                this.defaultState()
            }
        }
    }

    render() {
        const {
            first_name,
            last_name,
            email,
            address,
            gender,
            date_of_birth,
            phone_number,
            passport,
            right_thumb,
            right_index,
            left_thumb,
            left_index,
        } = this.state;

        return (
            <div>
                <div id="reg_dialog_sec" className="d-none">
                    <div className="shadow p-3 border border-rounded border-info" id="detail_dialog">
                        <p className="font-weight-bold py-2 alert alert-info py-2">
                            <span>REGISTRATION SUCCESSFUL!</span>
                        </p>
                        <div className="text-center">
                            <button className="font-weight-bold text-success px-2" onClick={this.continueReg} >ADD MORE</button>
                            &ensp; &ensp; &ensp;
                            <Link to="/listview">
                                <button className="font-weight-bold text-primary px-2">
                                    View List
                            </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <h3 className="text-center h3">Biometric Registration Form</h3>
                <form onSubmit={this.onSubmit} ref={(el) => this.dataCreateForm = el}>
                    <fieldset className="">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <label htmlFor="first_name"> Names
                                    <div className="row">
                                                <div className="col-6">
                                                    <input type="text"
                                                        name="first_name"
                                                        className="form-control"
                                                        id="first_name"
                                                        placeholder="First name"
                                                        ref={this.RegFirst_NameRef}
                                                        value={first_name}
                                                        onChange={this.onChange}
                                                        required="required" />
                                                </div>
                                                <div className="col-6">
                                                    <input type="text"
                                                        name="last_name"
                                                        className="form-control "
                                                        id="last_name"
                                                        placeholder="Last name"
                                                        ref={this.RegLast_NameRef}
                                                        value={last_name}
                                                        onChange={this.onChange}
                                                        required="required" />
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">E-mail</label>
                                        <input type="email"
                                            name="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="E-mail"
                                            value={email}
                                            onChange={this.onChange}
                                            required="required" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <textarea
                                            name="address"
                                            id="address"
                                            className="form-control"
                                            placeholder="Address"
                                            value={address}
                                            onChange={this.onChange}
                                            required="required" />
                                    </div>
                                    {(gender !== null) ?
                                        <div className="form-group">
                                            <label htmlFor="gender">Gender&ensp;
                                        <select name="gender" id="gender" className="form-control">
                                                    <option selected>{gender}</option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </label>
                                        </div>
                                        :
                                        <div className="form-group">
                                            <label htmlFor="gender">Gender&ensp;
                                    <select name="gender" id="gender" className="form-control">
                                                    <option>----</option>
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </label>
                                        </div>}

                                    <div className="form-group">
                                        <label htmlFor="date_of_birth">Date of Birth</label>
                                        <input type="date"
                                            name="date_of_birth"
                                            className="form-control"
                                            id="date_of_birth"
                                            value={date_of_birth}
                                            onChange={this.onChange}
                                            required="required" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone_number">Phone Number</label>
                                        <input type="number"
                                            name="phone_number"
                                            className="form-control"
                                            id="phone_number"
                                            placeholder="Phone Number"
                                            value={phone_number}
                                            onChange={this.onChange}
                                            required="required" />
                                    </div>
                                </div>

                                <div className="col-md-7 pt-4 shadow">
                                    <center className="button-group">
                                        {passport ?
                                            <img src={passport} alt="passport" id="default_passport" />
                                            : ""
                                        }
                                        <main className="row pt-3 text-center table-responsive">
                                            <div id="vidstream" className="d-none">
                                                <center className="col-12 pb-1">
                                                    <span id="switchOn">
                                                        <p className="font-weight-bold h6">View Stream</p>
                                                        <video
                                                            ref="video"
                                                            autoPlay
                                                            id="video"
                                                            width="250"
                                                            height="300" />
                                                    </span>
                                                    <span id="switchOff">
                                                        <p className="font-weight-bold h6">Captured Image</p>
                                                        <canvas
                                                            ref="canvas"
                                                            id="canvas"
                                                            src={passport}
                                                            width="250"
                                                            height="200" />
                                                        <input type="hidden" name="passport" value={passport} id="passport" />
                                                        <div id="snapshot" className="img-responsive d-none"></div>

                                                    </span>
                                                </center>
                                            </div>
                                        </main>
                                        <button id="btn-start" type="button" className="btn btn-primary btn-sm" onClick={startStreaming}>Start Camera</button> &ensp;
                                    <button id="btn-capture" type="button" className="btn btn-success btn-sm" onClick={captureSnapshot}>Capture Image</button> &ensp;
                                    <button id="btn-stop" type="button" className="btn btn-danger btn-sm" onClick={stopStreaming}>Turn off Camera</button>
                                    </center>
                                    <div className="py-3 text-center">
                                        <div id="startregfgpcapture">
                                            <button type="button" id="startnewfgpacquisition" className="text-center btn btn-secondary btn-xs">
                                                Start Finger Print Accquisition
                                        </button>
                                        </div>
                                        <div id="stopregfgpcapture" className="d-none">
                                            <button type="button" id="stopfgpacquisition" className="text-center btn btn-danger btn-xs">
                                                Stop Finger Print Accquisition
                                        </button>
                                        </div>
                                    </div>
                                    <div id="content-capture" className="col-md-12">
                                        <div className="m-auto">
                                            <small id='regfgpstatus'></small>
                                            <div id="imagediv"></div>
                                        </div>
                                    </div>
                                    <div className="row text-center">
                                        <div className="col-md-3 py-2">
                                            <p className="h6">Right Thumb</p>
                                            <button type="button" className="" id="right_thumb_btn">
                                                <img id="right_thumb_sample" src={'../../../static/img/rightthumb.png'} alt="rightthumb" height="50" width="50" />
                                                <img id="get_right_thumb" className="d-none" src="" alt="rightthumb" height="50" width="50" />
                                            </button>
                                            <input type="hidden" name="right_thumb" value={right_thumb} id="right_thumb" />
                                        </div>

                                        <div className="col-md-3 py-2">
                                            <p className="h6">Right Index</p>
                                            <button type="button" className="" id="right_index_btn">
                                                <img id="right_index_sample" src={"../../../static/img/rightindex.png"} alt="rightindex" height="50" width="50" />
                                                <img id="get_right_index" className="d-none" src="" alt="rightthumb" height="50" width="50" />
                                            </button>
                                            <input type="hidden" name="right_index" value={right_index} id="right_index" />
                                        </div>

                                        <div className="col-md-3 py-2">
                                            <p className="h6">Left Thumb</p>
                                            <button type="button" id="left_thumb_btn">
                                                <img id="left_thumb_sample" src={"../../../static/img/leftthumb.png"} alt="leftthumb" height="50" width="50" />
                                                <img id="get_left_thumb" className="d-none" src="" alt="rightthumb" height="50" width="50" />
                                            </button>
                                            <input type="hidden" name="left_thumb" value={left_thumb} id="left_thumb" />
                                        </div>

                                        <div className="col-md-3 py-2">
                                            <p className="h6">Left Index</p>
                                            <button type="button" id="left_index_btn">
                                                <img id="left_index_sample" src={"../../../static/img/leftindex.png"} alt="leftindex" height="50" width="50" />
                                                <img id="get_left_index" className="d-none" src="" alt="rightthumb" height="50" width="50" />
                                            </button>
                                            <input type="hidden" name="left_index" value={left_index} id="left_index" />
                                        </div>
                                    </div>

                                    <div className="py-5 px-5 mx-5">
                                        <div className="text-center">
                                            <label htmlFor="affirmation" className="form-group pt-3">
                                                <input type="checkbox" required="required" id="affirmation" />
                                                &ensp; Terms of Aggreement
                                        </label>
                                        </div>
                                        {this.props.regdata !== undefined ?
                                            <button type="pmit" className="btn btn-outline-success btn-rounded btn-block my-1 waves-effect z-depth-0 setactive" > Update Data </button>
                                            :
                                            <button type="pmit" className="btn btn-outline-success btn-rounded btn-block my-1 waves-effect z-depth-0 setactive" > Save Data </button>
                                        }
                                        {this.props.regdata !== undefined ?
                                            <button type="button" className="btn btn-outline-danger btn-rounded btn-block" onClick={this.props.updateBtn}>Close Form</button>
                                            :
                                            <button type="button" className="btn btn-outline-danger btn-rounded btn-block" onClick={this.clearForm}>Reset From</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form >
            </div>
        )
    }
}
// The video stream
var cameraStream = null;
var togglePassport = document.getElementById("default_passport")
// start stream
function startStreaming() {
    stopStreaming();
    if (togglePassport) {
        togglePassport.className = "d-none";
    }
    document.getElementById("canvas").className = 'd-block';
    document.getElementById("vidstream").className = "d-block";
    document.getElementById("switchOn").className = "d-block";
    document.getElementById("switchOff").className = "d-none";

    var mediaSupport = 'mediaDevices' in navigator;

    if (mediaSupport && null == cameraStream) {

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (mediaStream) {

                cameraStream = mediaStream;
                var stream = document.querySelector("video");
                stream.srcObject = mediaStream;

                stream.play();
            })
            .catch(function (err) {

                console.log("Unable to access camera: " + err);
            });
    }
    else {

        alert('Camera is already runing "just click CAPTURE" ');

        return;
    }
}


// Captutre
function captureSnapshot() {
    document.getElementById("switchOn").className = "d-none";
    document.getElementById("switchOff").className = "d-block";

    if (null != cameraStream) {
        var capture = document.getElementById("canvas");
        var stream = document.querySelector("video");
        var ctx = capture.getContext('2d');
        var img = new Image();

        ctx.drawImage(stream, 0, 0, capture.width, capture.height);

        img.src = capture.toDataURL("image/png");
        img.width = 240;
        var snapshot = document.getElementById("snapshot");
        snapshot.innerHTML = '';

        snapshot.appendChild(img);
        document.getElementById('passport').value = img.src;
    }
}

// Stop Streaming
function stopStreaming() {
    document.getElementById("switchOn").className = "d-none";
    document.getElementById("switchOff").className = "d-block";
    if (null != cameraStream) {
        var track = cameraStream.getTracks()[0];
        var stream = document.querySelector("video");
        track.stop();
        stream.load();
        cameraStream = null;
    }
}


export default connect(null, { Register, updateRegister, createMessage })(RegForm);

