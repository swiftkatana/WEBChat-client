import { combineReducers } from 'redux';
import { reducer } from 'redux-form';

import userReducer from '../user/userReducer'
import userAreaReducer from './chatArea';
import callReducer from './callReducer';
import languageReducer from './languageReducer';

export default combineReducers({
    user: userReducer,
    form: reducer,
    chatArea: userAreaReducer,
    language: languageReducer,
    call: callReducer
});