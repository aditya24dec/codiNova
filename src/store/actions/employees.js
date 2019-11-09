

import ActionTypes from '../constants';

export const storeEmployees = (param) => {
  return ({
    type: ActionTypes.STORE_EMPLOYEES,
    payload: param
  });
} 

export const createEmployee = (param) =>{
  return ({
    type:ActionTypes.CREATE_EMPLOYEE,
    payload:param
  })
}