import axios from 'axios';
import { createMessage, returnErrors } from './actnmessages';
import { tokenConfig } from './auth';
import { SEND_UPLOAD_SAMPLE, SEND_SCANNED_SAMPLE, GET_SAMPLE_RESULTS } from './types';



// GET_SAMPLE_RESULTS
export const getSampleResults = () => (dispatch, getState) => {
    let endpoint = 'http://127.0.0.1:8000/data/verification'
    axios
        .get(endpoint, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_SAMPLE_RESULTS,
                predictions: res.data,
                sample1: res.data.sample1,
                sample2: res.data.sample2,
                sample3: res.data.sample3,
                matchfound: res.data.matchfound,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
    console.log(response.data)
};



// SEND_UPLOAD_SAMPLE
export const sendUploadSample = (specimen) => (dispatch, getState) => {
    axios
        .post('http://127.0.0.1:8000/data/verification', specimen, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: SEND_UPLOAD_SAMPLE,
                predictions: res.data,
                sample1: res.data.sample1,
                sample2: res.data.sample2,
                sample3: res.data.sample3,
                matchfound: res.data.matchfound,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// SEND_SCANNED_SAMPLE
export const sendScannedSample = (specimen) => (dispatch, getState) => {
    axios
        .post('http://127.0.0.1:8000/data/verification', specimen, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: SEND_SCANNED_SAMPLE,
                predictions: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};
