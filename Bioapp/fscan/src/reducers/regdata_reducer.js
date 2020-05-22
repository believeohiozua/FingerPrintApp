import { GET_DATA, GET_DATA_DETAIL, DELETE_DATA, REG_DATA, UPDATE_REG_DATA } from '../actions/types.js';

const initialState = {
    regdata: [],
    next: null,
    previous: null,
    this_user: false,
    count: 0,
    detail: [],
    search_query: [],
};


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                regdata: action.payload,
                next: action.next,
                previous: action.previous,
                this_user: action.this_user,
                count: action.count,
                search_query: action.search_query,
            };
        case GET_DATA_DETAIL:
            return {
                ...state,
                detail: action.detail //this.state.detail.concat(),

            };
        case DELETE_DATA:
            return {
                ...state,
                detail: action.detail.pk,
            };
        case REG_DATA:
            return {
                ...state,
                detail: [...state.detail, action.payload],
            };
        case UPDATE_REG_DATA:
            return {
                ...state,
                detail: action.payload,
            };
        default:
            return state;
    }
}
