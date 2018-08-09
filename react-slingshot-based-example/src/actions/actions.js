
/* eslint-disable no-console */
import AppApi from './../api/mockAppApi';
import toastr from 'toastr';
import {SAVE_CHANGED_VALUE, ADD_TO_LIST, UPDATE_FROM_SERVICE_SUCESS} from '../constants/actionTypes';

export function addToStore(value) {
  return {
    type: ADD_TO_LIST,    
    value
  };
}
export function saveChangedValue(value) {
  return {
    type: SAVE_CHANGED_VALUE,    
    value
  };
}
export function updateSuccess(data) {
  toastr.success('Message!', 'Updated course successfully');
  return {type : UPDATE_FROM_SERVICE_SUCESS, data};
}
export function updateFromService() {
  return function(dispatch ){
    AppApi.getData().then( data =>{
      dispatch(updateSuccess(data));
    });   
  };
}

