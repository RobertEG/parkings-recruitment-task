import { combineReducers } from "redux";
import { parkings } from './parkings';
import { parkingsSearch } from './parkingsSearch';
import { fetchSelected } from './fetchSelected';
import { fetchOnMouseOver } from './fetchOnMouseOver';

export default combineReducers({
    parkings,
    parkingsSearch,
    fetchSelected,
    fetchOnMouseOver
});