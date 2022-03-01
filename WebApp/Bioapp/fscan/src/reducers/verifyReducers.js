import { SEND_UPLOAD_SAMPLE, SEND_SCANNED_SAMPLE, GET_SAMPLE_RESULTS } from '../actions/types.js';

const initialState = {
    predictions: null,
    sentSpecimen: "",
    sample1: [],
    sample2: [],
    sample3: [],
    matchfound: null,
};


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SAMPLE_RESULTS:
            return {
                ...state,
                predictions: action.predictions,
                sample1: action.sample1,
                sample2: action.sample2,
                sample3: action.sample3,
                matchfound: action.matchfound,
            };
        case SEND_UPLOAD_SAMPLE:
            return {
                ...state,
                predictions: action.predictions,
                sample1: action.sample1,
                sample2: action.sample2,
                sample3: action.sample3,
                matchfound: action.matchfound,

            };
        case SEND_SCANNED_SAMPLE:
            return {
                ...state,
                sentSpecimen: action.predictions
            };
        default:
            return state;
    }
}
