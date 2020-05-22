import { combineReducers } from 'redux';
import regdata_reducer from './regdata_reducer';
import errors from './errors';
import messages from './messages';
import authReducer from './authReducer';
import verifyReducers from './verifyReducers';

export default combineReducers({
    regdata_reducer,
    errors,
    messages,
    authReducer,
    verifyReducers,
}); 