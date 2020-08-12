import {combineReducers} from 'redux';
import {reducer} from 'redux-form';


import userReducer from './userReducer'
import authReducer from './authReducer';
import userAreaReducer from './chatArea';
import leguageReducer from './leguageReducer'
export default combineReducers({
    user:userReducer,
    auth:authReducer,
    form:reducer,
    chatArea:userAreaReducer,
    leg:leguageReducer
});