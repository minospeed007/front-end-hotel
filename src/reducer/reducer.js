import {combineReducers} from 'redux';
import counterReducer from '../components/counter/counter'

const rootReducer=combineReducers({
    counter:counterReducer,
})

export default rootReducer;