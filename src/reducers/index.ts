import { combineReducers } from 'redux';
import currentDateReducer from '../slices/currentDateSlice';
import filterReducer from '../slices/filtersSlice';
import itemsReducer from '../slices/itemsSlice';

export default combineReducers({
    items: itemsReducer,
    tabItemFilter: filterReducer,
    currentDate: currentDateReducer,
});
