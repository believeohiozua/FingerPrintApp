import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendUploadSample, getSampleResults } from '../../actions/verifyActions';


class UploadForm extends Component {
    constructor(props) {
        super(props)
        this.sendData = this.sendData.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.state = {
            upload: null,
        }
    }
    static propTypes = {
        sendUploadSample: PropTypes.func.isRequired,
        getSampleResults: PropTypes.func.isRequired,
        statusfucOn: PropTypes.func.isRequired,
        statusfucOff: PropTypes.func.isRequired,
        ResetSpace: PropTypes.func.isRequired,
        openSpace: PropTypes.func.isRequired,
        matchfound: PropTypes.bool,

    };



    handleInputChange(event) {
        event.preventDefault()
        console.log(event.target.name, event.target.value)
        let key = event.target.name
        var profile = []
        var input = document.getElementById("upload");
        var fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);

        fReader.onloadend = (event) => {
            var img = document.createElement("img")
            img.src = event.target.result;
            img.width = 100
            img.height = 100
            img.id = 'showimg'
            img.alt = key
            profile[0] = event.target.result;
            let showimg = document.getElementById('val')
            showimg.innerHTML = '';
            showimg.appendChild(img);
            showimg.className = "text-center"
            document.getElementById('sample_img').innerHTML = 'SPECIMEN'

            if (showimg !== undefined || showimg !== null) {
                var vrfbtn = document.getElementById('vrfbtn')
                vrfbtn.className = "d-block mx-auto text-center"
            }
            return profile;

        }
        this.setState({
            [key]: profile,
        })
    }

    sendData(event) {
        event.preventDefault()
        this.props.ResetSpace();
        let data = this.state
        console.log('this is the sent data: ', data)
        this.props.sendUploadSample(data);
        this.props.statusfucOn();
    }

    render() {
        return (
            <div className="pb-4 mx-auto">
                <hr />
                <div className="shadow pl-5 border border-info" id="upload-sec">
                    <p className="font-weight-bold pt-3"> Verify By Upload Sample</p>
                    <form onSubmit={this.sendData}>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="upload">
                                    <br />
                                    <input
                                        className="col-12"
                                        type="file"
                                        ref="file"
                                        accept="image/*"
                                        multiple={false}
                                        name="upload"
                                        id="upload"
                                        onChange={this.handleInputChange} />
                                </label>
                                <div className="p-1 px-3 text-center">
                                    <span id="sample_img" className="font-weight-bold text-center"></span>
                                    <div id="val"> </div>
                                </div>
                                <div id='vrfbtn' className="d-none">
                                    <button type="submit" className="btn btn-outline-primary btn-xs px-5"> Verify </button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    matchfound: state.verifyReducers.matchfound,
});
export default connect(mapStateToProps, { sendUploadSample, getSampleResults })(UploadForm);

