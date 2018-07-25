import objectAssign from 'object-assign';
import {ADD_TO_LIST, SAVE_CHANGED_VALUE, UPDATE_FROM_SERVICE_SUCESS} from '../constants/actionTypes';

export default function appReducer(state = {values : [] }, action) {	
	let newState;
	switch (action.type) {
		case ADD_TO_LIST: {				
				return objectAssign({}, state, {value: action.value, values : [...state.values, action.value] });				
			}
		case SAVE_CHANGED_VALUE:			
			return objectAssign({}, state, {value: action.value});
		case UPDATE_FROM_SERVICE_SUCESS: {
			newState = objectAssign({}, state);
			newState.values = [...state.values, action.data.text];
			return newState;
		}
			default:
				return state;
	}
}

