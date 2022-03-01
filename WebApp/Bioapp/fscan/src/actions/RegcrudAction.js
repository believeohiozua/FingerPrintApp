import axios from 'axios';
import { createMessage, returnErrors } from './actnmessages';
import { tokenConfig } from './auth';
import { GET_DATA, GET_DATA_DETAIL, DELETE_DATA, REG_DATA, UPDATE_REG_DATA } from './types';



// GET DATA
export const getData = (next) => (dispatch, getState) => {
    let endpoint = 'http://127.0.0.1:8000/data/'
    if (next !== undefined) {
        endpoint = next
    }
    axios
        .get(endpoint, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_DATA,
                payload: res.data.results,
                next: res.data.next,
                previous: res.data.previous,
                this_user: res.data.this_user,
                count: res.data.count,
                search_query: res.data.search_query,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET DATA DETAIL
export const getDataDetail = (pk) => (dispatch, getState) => {
    axios
        .get(`http://127.0.0.1:8000/data/${pk}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_DATA_DETAIL,
                detail: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE DATA
export const deleteData = (pk) => (dispatch, getState) => {
    axios
        .delete(`http://127.0.0.1:8000/data/${pk}/`, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage({ deleteData: 'Data Deleted' }));
            dispatch({
                type: DELETE_DATA,
                payload: res.data.pk,
            });
        })
        .catch((err) => console.log(err));
};


// REG_DATA
export const Register = (newData) => (dispatch, getState) => {
    axios
        .post('http://127.0.0.1:8000/data/', newData, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: REG_DATA,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// UPDATE_REG_DATA
export const updateRegister = (pk, newData) => (dispatch, getState) => {
    axios
        .put(`http://127.0.0.1:8000/data/${pk}/`, newData, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: UPDATE_REG_DATA,
                payload: res.data,
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};