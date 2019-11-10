

import ActionTypes from '../constants';

export const storeEmployees = (param) => {
  return ({
    type: ActionTypes.STORE_EMPLOYEES,
    payload: param
  });
} 

export const employeeCount = (param) =>{
  return ({
    type:ActionTypes.EMPLOYEE_COUNT,
    payload:param
  })
}


export const favouriteCount = (param) =>{

  return ({
    type:ActionTypes.EMPLOYEE_FAVOURITE_COUNT,
    payload:param
  })
}