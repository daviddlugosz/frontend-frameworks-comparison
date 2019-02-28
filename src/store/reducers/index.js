import { combineReducers } from 'redux';
import pageReducer from './pageReducer.js';

export default () => combineReducers({
    pages: pageReducer
});