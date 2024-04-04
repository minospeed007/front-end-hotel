import {createStore} from 'redux';
import RootReducer from './reducer/reducer';

const store=createStore(RootReducer);

export default store;