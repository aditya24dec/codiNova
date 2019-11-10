import ActionTypes from '../constants';

const initialState = {
  totalEmployees: [],
  employeeCount:0,
  favouriteCount:0
};


const Employees = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STORE_EMPLOYEES:
      return Object.assign({}, state, {
        totalEmployees: [...action.payload],
      });
    
    case ActionTypes.EMPLOYEE_COUNT:
      return Object.assign({},state,{
        employeeCount:action.payload
      });

    case ActionTypes.EMPLOYEE_FAVOURITE_COUNT:
      return Object.assign({},state,{
        favouriteCount:action.payload
      })
    
    default:
      return state;
  }
};

export default Employees;